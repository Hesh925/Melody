const fs = require("fs");
module.exports = {
	name: "stateChange",
	execute(_Discord, _client, _opusEncoder, _voicePlayer, _DJSVoice, _queueArray, nowPlaying, oldState, newState) {
		const stateFiles = fs.readdirSync("./src/events/player/playerStates").filter(file => file.endsWith(".state.js"));
		console.log(`oldState: ${ oldState.status }`);
		console.log(`newState: ${ newState.status }`);

	}
};