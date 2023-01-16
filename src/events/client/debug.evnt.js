module.exports = {
	name: "debug",
	async execute(_Discord, client, config, utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, debug) {
		if(utils.searchArgv("debug")) {
			console.log(`[DEBUG] ${ debug }`.red);
			utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, `[DEBUG] ${ debug }`);
		}
	}
};