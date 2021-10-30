const ytsr = require("ytsr");
const queueModel = require("../../models/queue.schema.js");
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
	async execute(_client, message, args, _Discord, _config, _ezcolor, utils) {
		async function saveQueue(videoData) {
			try {
				const guildSchema = await queueModel.create({
					userID:   message.userId,
					guildID:  message.guildId,
					textCID:  message.channel.id,
					songURL:  videoData.url,
					songName: videoData.Title,
					queuePos: 123
				});
				guildSchema.save().then(message.channel.send("added song to queue"));
			} catch (err) {
				utils.log(err);
				message.channel.send("An error has occurred while trying to queue your song please try again");
			}
		}
		const searchTerm = String(args).replace(/,/g, " ");
		const filter = await ytsr.getFilters(searchTerm);
		const filter1 = filter.get("Type").get("Video");
		const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
		const videoData = resp["items"][0];
		saveQueue(videoData);
	}
};