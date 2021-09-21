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
	// eslint-disable-next-line no-unused-vars
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, voicePlayer, _DJSVoice, _queueMap) {
		if (message.member.voice.channel !== null) {
			if (voicePlayer.subscribers.length !== 0) {
				console.log(voicePlayer.state.status === "paused");
				voicePlayer.unpause();
				message.channel.send("Unpaused playback");
			} else {
				message.channel.send("Nothing is playing");
			}
			console.log(voicePlayer);
		}
	}
};