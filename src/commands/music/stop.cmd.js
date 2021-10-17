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
	// eslint-disable-next-line no-unused-vars
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, DJSVoice, _queueMap) {
		if (message.member.voice.channel !== null) {
			if (voicePlayer.subscribers.length !== 0) {
				voicePlayer.stop();
				console.log(voicePlayer.state.status === "paused");
				message.channel.send("Playback stopped");
			} else {
				message.channel.send("Nothing is playing");
			}
		} 
	}
};