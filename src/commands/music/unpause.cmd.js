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
	allowSlash: true, 
	options: [],
	run: async (_client, message, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if(voicePlayer.state.status !== "playing") {
				if(voicePlayer.state.status === "paused") {
					voicePlayer.unpause();
					message.channel.send("Unpaused playback");
				} else message.channel.send("Nothing is playing");
			} else message.channel.send("Can't unpause something that isn't paused");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	},

	slash: async (_client, interaction, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice) => {
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