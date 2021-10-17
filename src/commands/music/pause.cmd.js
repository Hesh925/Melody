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
	// eslint-disable-next-line no-unused-vars
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, _DJSVoice, _queueMap) {
		if (message.member.voice.channel !== null) {
			if (voicePlayer.subscribers.length !== 0) {
				voicePlayer.pause();
				console.log(voicePlayer.state.status === "paused");
				message.channel.send("Paused playback");
			} else {
				message.channel.send("Nothing is playing");
			}

			console.log(voicePlayer);
		} 
	}
};