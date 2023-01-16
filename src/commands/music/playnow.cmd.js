const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "playnow",
	description: "Stops the current song and plays the given one",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [ "pn" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [],
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const connection = DJSVoice.getVoiceConnection(message.guild.id);
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				voicePlayer.stop();
				client.commands.get("play").run(client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
			} else message.channel.send("Nothing is playing");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId);
		if (interaction.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				voicePlayer.stop();
				client.commands.get("play").slash(client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
			} else  interaction.editReply({ content: "Nothing is playing", ephemeral: true }).then( utils.pm2.compInt() );
		} else interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true }).then( utils.pm2.compInt() );
	}
};