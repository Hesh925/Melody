module.exports = {
	name: "",
	async execute(_Discord, _client, _config, _utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, data) {
		console.log(` || <==> || [${ String(new Date).split(" ", 5).join(" ") }] || <==> || Shard #${ data } Disconnected || <==> ||`);
	}
};