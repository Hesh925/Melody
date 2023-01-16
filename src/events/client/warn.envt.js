module.exports = {
	name: "warn",
	async execute(_Discord, client, config, utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, warn) {
		console.log(`[WARN] ${ warn }`.red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, `[WARN] ${ warn }`);
	}
};
