module.exports = {
	name: "error",
	async execute(_Discord, _client, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, error) {
		console.log(`[ERROR] ${ error }`.red);
	}
};