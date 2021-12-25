const utils = require("djs-utils");
module.exports = {
	name: "debug",
	async execute(_Discord, _client, colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, debug) {
		if(utils.searchArgv("debug")) {
			console.log(`[DEBUG] ${ debug }`.red);
		}
	}
};