module.exports = {
	name: "error",
	execute(_Discord, _client, _opusEncoder, _voicePlayer, _DJSVoice, _queueArray, error) {
		console.log(error);
		console.log("caught this error");
	}
};