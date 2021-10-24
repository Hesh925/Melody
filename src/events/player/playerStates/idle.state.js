const utils = require("djs-utils");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
module.exports = {
	name: "idle",
	async execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage, oldState, newState) {
		if(oldState.status === "playing") {
			if(queueMap.length !== 0) {
				const connection = await DJSVoice.getVoiceConnection(lastMessage.guildId); // Get connection
				connection.subscribe(voicePlayer); // Create subscription
				const searchTerm = String(queueMap[0]).replace(/,/g, " ");
				queueMap.shift();
				if(searchTerm !== "" ) {
					const filter = await ytsr.getFilters(searchTerm);
					const filter1 = filter.get("Type").get("Video");
					const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
			
					if(resp !== null) {
						const videoData = resp["items"][0];
						nowPlaying["0"] = videoData;
			
						const resource = DJSVoice.createAudioResource(ytdl(videoData.url, { filter: "audioonly", quality: "highestaudio" }));
						voicePlayer.play(resource);
						utils.musicLog(videoData.title);
					}
				}
			}
		} else {
			console.log("finished playing");
		}
	}
};