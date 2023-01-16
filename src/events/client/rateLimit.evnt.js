module.exports = {
	name: "rateLimit",
	async execute(_Discord, client, config, utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, rateLimitData) {
		utils.log(JSON.stringify(rateLimitData).red.italic.dim);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, JSON.stringify(rateLimitData));
	}
};