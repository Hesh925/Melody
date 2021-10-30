module.exports = {
	name: "error",
	execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, error) {
		console.log(error);
		console.log("caught this error");
	}
};