const path = require("path");
const fs = require("fs");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
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

		if (message.member.voice.channel !== null) {
			client.commands.get("join").execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice); // Call join command 
			const connection = await DJSVoice.getVoiceConnection(message.guild.id); // Get connection
			connection.subscribe(voicePlayer); // Create subscription

			const searchTerm = String(args).replace(/,/g, " ");
			if(searchTerm !== "" ) {
				const filter = await ytsr.getFilters(searchTerm);
				const filter1 = filter.get("Type").get("Video");
				const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
				
				if(resp !== null) {
					const videoData = resp["items"][0];
					const resource = DJSVoice.createAudioResource(ytdl(videoData.url, { filter: "audioonly" }));
					voicePlayer.play(resource);
					try {
						await DJSVoice.entersState(voicePlayer, DJSVoice.AudioPlayerStatus.Playing);
						client.commands.get("nowplaying").execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice); // Call nowPlaying command
						console.log("Playback has started!");
					} catch (error) {
						message.channel.send("An error has occurred");
						console.error(error);
					}
				}
			} else {
				message.channel.send("You must provide a search term");
			}
		} else {
			message.channel.send("You must be in a voice channel to use this command");
		}
	}
};