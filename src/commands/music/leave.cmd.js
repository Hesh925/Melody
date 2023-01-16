const { SlashCommandBuilder } = require("discord.js");

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

	slashData: new SlashCommandBuilder()
		.setName("leave")
		.setDescription("Make bot leave channel"),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if(connection) {
			if (voiceChannel) {
				if(voiceChannel.id === connection.joinConfig.channelId) {
					connection.destroy();
					voicePlayer.stop();
					interaction.editReply({ content: "Left voice channel", ephemeral: true });
				} else {
					interaction.editReply({ content: "You must be in the same channel as the bot to use this command", ephemeral: true });
				}
			} else {
				interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true });
			}
		} else {
			interaction.editReply({ content: "Bot is not connected to a voice channel", ephemeral: true });
		}
	}
};