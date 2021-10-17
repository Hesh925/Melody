/* eslint-disable */
module.exports = {
	name: "voiceStateUpdate",
	async execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, oldState, newState) {
		let userTag = newState.member.user.tag;
		if (
			(!oldState.streaming && newState.streaming)   ||
			(oldState.streaming && !newState.streaming)   ||
			(!oldState.serverDeaf && newState.serverDeaf) ||
			(oldState.serverDeaf && !newState.serverDeaf) ||
			(!oldState.serverMute && newState.serverMute) ||
			(oldState.serverMute && !newState.serverMute) || 
			(!oldState.selfDeaf && newState.selfDeaf)     ||
			(oldState.selfDeaf && !newState.selfDeaf)     ||
			(!oldState.selfMute && newState.selfMute)     ||
			(oldState.selfMute && !newState.selfMute)     ||
			(!oldState.selfVideo && newState.selfVideo)   ||
			(oldState.selfVideo && !newState.selfVideo) 
		 ) return;
		//if (oldState.channelID !== newState.channelID) {
		// 	console.log(`${userTag} left: ${oldState.channel.name}`);
		//}
		//if (oldState.channelID !== newState.channelID) {
		//	console.log(`${userTag} joined: ${newState.channel.name}`);
		//}
		//if (oldState.channelID && newState.channelID) {
		//	console.log(`${userTag} switched from: ${oldState.channel.name} to: ${newState.channel.name}`);
		//}
	}
};