module.exports = {
	name: "error",
	execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, lastMessage, error) {
		console.log(error);
		console.log("caught this error");
	}
};