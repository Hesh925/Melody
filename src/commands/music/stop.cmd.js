const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "stop",
	description: "Stops the music player",
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

	slashData: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops the music player"),

	execute: async (client, interaction, Discord, _colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		if (interaction.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				voicePlayer.pause();
				voicePlayer.stop();
				await interaction.editReply({ content: "Stopped playback", ephemeral: true });
			} else await interaction.editReply({ content: "Nothing is playing", ephemeral: true });
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true });
	}
};