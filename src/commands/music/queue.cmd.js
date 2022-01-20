const ytsr = require("ytsr");
const queueModel = require("../../models/queue.schema.js");
const guildModel = require("../../models/guild.schema.js");
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
	allowSlash: true, 
	options: [ {"String": { name: "song", description: "Title or URL for the song you want to add to the queue", required: true }} ],
	run: async (_client, message, args, _Discord, _colors, _config, _ezcolor, utils) => {

		const queueRes = await queueModel.find({ guildID: message.guildId }).sort({queuePos: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const pos = queueRes !== null ? queueRes.queuePos + 1 : 1;
		async function saveQueue(videoData) {
			console.log(videoData);
			try {
				const guildSchema = await queueModel.create({
					userID:     message.userId,
					guildID:    message.guildId,
					textCID:    message.channel.id,
					songURL:    videoData.url,
					songName:   videoData.title,
					songLength: videoData.duration,
					queuePos:   pos
				});
				guildSchema.save().then(message.channel.send("added song to queue"));
				await guildModel.findOneAndUpdate({ guildID: message.guildId }, { $inc: { songsInQueue: 1 }});
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
	},

	slash: async (_client, interaction, _args, _Discord, _colors, _config, _ezcolor, utils) => {
		const searchFor = interaction.options.getString("song");

		const queueRes = await queueModel.find({ guildID: interaction.guildId }).sort({queuePos: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const pos = queueRes !== null ? queueRes.queuePos + 1 : 1;
		async function saveQueue(videoData) {
			try {
				const guildSchema = await queueModel.create({
					userID:     interaction.user.id,
					guildID:    interaction.guildId,
					textCID:    interaction.channelId,
					songURL:    videoData.url,
					songName:   videoData.title,
					songLength: videoData.duration,
					queuePos:   pos
				});
				guildSchema.save().then(interaction.editReply({ content: `Added '${ videoData.title }' to queue` }));
				await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { $inc: { songsInQueue: 1 }});
			} catch (err) {
				utils.log(err);
				interaction.editReply("An error has occurred while trying to queue your song please try again").then( utils.pm2.compInt() );
			}
		}
		const searchTerm = String(searchFor).replace(/,/g, " ");
		const filter = await ytsr.getFilters(searchTerm);
		const filter1 = filter.get("Type").get("Video");
		const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
		const videoData = resp["items"][0];
		saveQueue(videoData);
	}
};