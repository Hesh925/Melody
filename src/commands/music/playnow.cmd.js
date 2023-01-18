const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "playnow",
	description: "Stops the current song and plays the given one",
	category: "music",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("playnow")
		.setDescription("Stops the current song and plays the given one")
		.addStringOption(option => option.setName("song").setDescription("Song to play").setRequired(true)),

	execute: async (client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId);
		if (interaction.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				voicePlayer.stop();
				client.commands.get("play").slash(client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
			} else  interaction.editReply({ content: "Nothing is playing", ephemeral: true });
		} else interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true });
	}
};