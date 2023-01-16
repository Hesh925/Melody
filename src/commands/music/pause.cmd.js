const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "pause",
	description: "Pauses the music player",
	usage: "<> is strict & [] is optional",
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
	slashData: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the music player'),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if (voiceChannel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status !== "paused") {
				if (voicePlayer.state.status === "playing") {
					voicePlayer.pause();
					await interaction.editReply({ content: "Paused playback", ephemeral: true });
				} else await interaction.editReply({ content: "Nothing is playing", ephemeral: true });
			} else await interaction.editReply({ content: "Can't pause something that's already paused", ephemeral: true });
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true });
	}
};