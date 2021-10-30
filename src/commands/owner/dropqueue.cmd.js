const queueModel = require("../../models/queue.schema.js");
module.exports = {
	name: "dropqueue",
	description: "",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [ "dq" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying) {
		try {
			queueModel.collection.drop().then(message.channel.send("Dropped queue collection"));
		} catch (err) {
			utils.log(err);
			message.channel.send("An error has occurred while trying to drop the queue check the console for more info");
		}
	}
};