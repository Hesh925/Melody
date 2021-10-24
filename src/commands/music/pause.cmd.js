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
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice, _queueMap, _nowPlaying, lastMessage) {
		lastMessage[0] = message;
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status !== "paused") {
				if (voicePlayer.state.status === "playing") {
					voicePlayer.pause();
					message.channel.send("Paused playback");
				} else message.channel.send("Nothing is playing");
			} else message.channel.send("Can't pause something that's already paused");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	}
};