module.exports = {
	name: "threadCreate",
	async execute(_Discord, _client, _config, _utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, thread) {
		if(thread.joinable){
			try{
				await thread.join();
			}catch (e){
				console.log(e);
			}
		}
	}
};