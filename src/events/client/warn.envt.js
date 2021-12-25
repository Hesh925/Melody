module.exports = {
	name: "warn",
	async execute(_Discord, _client, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, warn) {
		console.log(`[WARN] ${ warn }`.red);
	}
};
