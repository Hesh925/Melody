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
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice, _queueMap, _nowPlaying) {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if(voicePlayer.state.status !== "playing") {
				if(voicePlayer.state.status === "paused") {
					voicePlayer.unpause();
					message.channel.send("Unpaused playback");
				} else message.channel.send("Nothing is playing");
			} else message.channel.send("Can't unpause something that isn't paused");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	}
};