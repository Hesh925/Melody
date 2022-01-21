module.exports = {
	name: "leave",
	description: "Make bot leave channel",
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
	run: async (_client, message, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if(connection) {
			if (message.member.voice.channel) {
				if(message.member.voice.channel.id === connection.joinConfig.channelId) {
					connection.destroy();
					voicePlayer.stop();
				} else {
					message.channel.send("You must be in the same channel as the bot to use this command");
				}
			} else {
				message.channel.send("You must be in the same channel as the bot to use this command");
			}
		} else {
			message.channel.send("Bot is not connected to a voice channel");
		}
	},

	slash: async (_client, interaction, _args, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if(connection) {
			if (voiceChannel) {
				if(voiceChannel.id === connection.joinConfig.channelId) {
					connection.destroy();
					voicePlayer.stop();
					utils.pm2.compInt();
					interaction.editReply({ content: "Left voice channel", ephemeral: true }).then( utils.pm2.compInt() );
				} else {
					utils.pm2.compInt();
					interaction.editReply({ content: "You must be in the same channel as the bot to use this command", ephemeral: true }).then( utils.pm2.compInt() );
				}
			} else {
				utils.pm2.compInt();
				interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true }).then( utils.pm2.compInt() );
			}
		} else {
			utils.pm2.compInt();
			interaction.editReply({ content: "Bot is not connected to a voice channel", ephemeral: true }).then( utils.pm2.compInt() );
		}
	}
};