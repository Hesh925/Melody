module.exports = {
	name: "playnow",
	description: "Stops the current song and plays the given one",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [ "pn" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage) {
		lastMessage[0] = message;
		const connection = DJSVoice.getVoiceConnection(message.guild.id);
		if (message.member.voice.channel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {
				voicePlayer.stop();
				client.commands.get("play").execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, "pn");
			} else message.channel.send("Nothing is playing");
		} else message.channel.send("Must be in the same channel as the bot to use this command");
	}
};