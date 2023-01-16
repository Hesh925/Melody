module.exports = {
	name: "error",
	async execute(_Discord, client, config, utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, error) {
		console.log(`[ERROR] ${ error }`.red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, `[ERROR] ${ error }`);
	}
};