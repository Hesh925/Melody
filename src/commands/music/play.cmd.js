const path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");
const ytSearch = require("../../utils/ytSearch");
module.exports = {
	name: "play",
	description: "play a track in the current voice",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [ "p" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap) {
		//const resource = DJSVoice.createAudioResource(path.join(__dirname, "video.mp4"));
		
		const cmdJoin = client.commands.get("join"); // Get join command
		cmdJoin.execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice); // Call join command 
		const connection = await DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		connection.subscribe(voicePlayer); // Create subscription

		voicePlayer.play(ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ"));
		try {
			await DJSVoice.entersState(voicePlayer, DJSVoice.AudioPlayerStatus.Playing, 5000);

			// Const cmdNP = client.commands.get("nowplaying"); // Get join command
			// CmdNP.execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice); // Call nowPlaying command

			console.log("Playback has started!");
		} catch (error) {
			message.channel.send("An error has occurred - could not join channel");
			console.error(error);
		}
	}
};