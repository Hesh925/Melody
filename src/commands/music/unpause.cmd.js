const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "unpause",
	description: "Unpauses the music player",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [ "up" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName('unpause')
		.setDescription('Unpauses the music player'),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		if (interaction.member.voice.channel.id === connection.joinConfig.channelId) {
			if(voicePlayer.state.status !== "playing") {
				if(voicePlayer.state.status === "paused") {
					voicePlayer.unpause();
					await interaction.editReply({ content: "Paused playback", ephemeral: true });
				} else await interaction.editReply({ content: "Nothing is playing", ephemeral: true });
			} else await interaction.editReply({ content: "Can't unpause something that isn't paused", ephemeral: true });
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true });
	}
};