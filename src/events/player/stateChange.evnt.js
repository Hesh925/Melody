const buffering = require("./playerStates/buffering.state.js");
const idle = require("./playerStates/idle.state.js");
const playing = require("./playerStates/playing.state.js");
module.exports = {
	name: "stateChange",
	execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState, newState) {
		if(newState.status === "buffering") {
			buffering.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState);
		}
		if(newState.status === "idle") {
			idle.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState);
		}
		if(newState.status === "playing") {
			playing.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState);
		}
	}
};