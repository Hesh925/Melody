const utils = require("djs-utils");
module.exports = {
	name: "rateLimit",
	async execute(_Discord, _client, colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, rateLimitData) {
		utils.log(JSON.stringify(rateLimitData).red.italic.dim);
	}
};