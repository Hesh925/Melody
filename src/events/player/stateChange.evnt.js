const buffering = require("./playerStates/buffering.state.js");
const idle = require("./playerStates/idle.state.js");
const playing = require("./playerStates/playing.state.js");
module.exports = {
	name: "stateChange",
	execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, oldState, newState) {

		if(newState.status === "buffering") {
			buffering.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, oldState, newState);
		}
		if(newState.status === "idle") {
			idle.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, oldState, newState);
		}
		if(newState.status === "playing") {
			playing.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, oldState, newState);
		}
	}
};