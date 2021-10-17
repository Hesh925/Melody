module.exports = {
	name: "idle",
	execute(_Discord, _client, _opusEncoder, _voicePlayer, _DJSVoice, _queueArray, nowPlaying, oldState, _newState) {
		if(oldState.status === "playing") {
			console.log("finished playing");
		}
	}
};