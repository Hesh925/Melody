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
	options: [],
	run: async (_client, message, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status !== "paused") {
				if (voicePlayer.state.status === "playing") {
					voicePlayer.pause();
					message.channel.send("Paused playback");
				} else message.channel.send("Nothing is playing");
			} else message.channel.send("Can't pause something that's already paused");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	},

	slash: async (_client, interaction, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if (voiceChannel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status !== "paused") {
				if (voicePlayer.state.status === "playing") {
					voicePlayer.pause();
					await interaction.reply({ content: "Paused playback", ephemeral: true });
				} else await interaction.reply({ content: "Nothing is playing", ephemeral: true });
			} else await interaction.reply({ content: "Can't pause something that's already paused", ephemeral: true });
		} else await interaction.reply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true });
	}
};