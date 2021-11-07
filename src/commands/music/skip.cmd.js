const queueModel = require("../../models/queue.schema.js");
const guildModel = require("../../models/guild.schema.js");
module.exports = {
	name: "skip",
	description: "Skip the song that is playing",
	usage: "",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [],
	run: async (client, message, _args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {


				const resp = await queueModel.find({ guildID: message.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
				client.commands.get("play").run(client, null, null, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying, resp);
				await queueModel.findOneAndDelete({ guildID: message.guildId }).sort({queuePos: 1}).limit(1);
				
			} else message.channel.send("Nothing is playing to skip");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	},

	slash: async (client, interaction, _args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if (voiceChannel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {


				await queueModel.findOneAndDelete({ guildID: interaction.guildId }).sort({queuePos: 1}).limit(1);
				await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { $inc: { songsInQueue: -1 }});
				const res = await queueModel.find({ guildID: interaction.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
				if(res !== null ) {
					await voicePlayer.pause();
					client.commands.get("play").run(client, null, null, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying, res, interaction, "slash");


				} else await interaction.editReply({ content: "The queue is empty"});
			} else await interaction.editReply({ content: "Nothing is playing to skip", ephemeral: true});
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true});
	}
};
