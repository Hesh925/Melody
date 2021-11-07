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
	allowSlash: true, 
	options: [],
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				voicePlayer.pause();
				voicePlayer.stop();
				message.channel.send("Stopped playback");
			} else message.channel.send("Nothing is playing");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	},

	slash: async (client, interaction, args, Discord, _colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) => {
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