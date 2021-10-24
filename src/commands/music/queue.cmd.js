const ytsr = require("ytsr");
module.exports = {
	name: "queue",
	description: "Add song to queue",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(_client, message, args, _Discord, _config, _ezcolor, _utils, _opusEncoder, _voicePlayer, _DJSVoice, queueMap, _nowPlaying, lastMessage) {
		lastMessage[0] = message.channel.id;
		const searchTerm = String(args).replace(/,/g, " ");
		const filter = await ytsr.getFilters(searchTerm);
		const filter1 = filter.get("Type").get("Video");
		const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
		const videoData = resp["items"][0];
		queueMap.push(videoData.url);
		message.channel.send("added song to queue");
	}
};