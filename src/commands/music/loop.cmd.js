const guildModel = require("../../models/guild.schema.js");
module.exports = {
	name: "loop",
	description: "Turn on loop mode",
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
	run: async (_client, message, _args, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const guildRes = await guildModel.findOne({ guildID: message.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				if (guildRes.loop) {
					try { await guildModel.findOneAndUpdate({ guildID: message.guildId }, { loop: false }); } catch (err) { utils.log(err); }
					message.channel.send("Loop set false");
				} else {
					try { await guildModel.findOneAndUpdate({ guildID: message.guildId }, { loop: true }); } catch (err) { utils.log(err); }
					message.channel.send("Loop set true");
				}
			} else message.channel.send("Nothing is playing to loop");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	},

	slash: async (_client, interaction, _args, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const guildRes = await guildModel.findOne({ guildID: interaction.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if (voiceChannel.id === connection.joinConfig.channelId) {

			if (voicePlayer.state.status === "playing") {

				if (guildRes.loop) {
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: false }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop set false").then( utils.pm2.compInt() );
				} else {
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: true }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop set true").then( utils.pm2.compInt() );
				}
			} else await interaction.editReply({ content: "Nothing is playing to loop", ephemeral: true}).then( utils.pm2.compInt() );
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true}).then( utils.pm2.compInt() );
	}
};