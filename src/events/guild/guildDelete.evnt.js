const guildModel = require("../../models/guild.schema.js");
const queueModel = require("../../models/queue.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "guildCreate",
	async execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, guild) {
		console.log(guild);
		let GuildData;
		let QueueData;
		try {
			GuildData = await guildModel.findOne({ guildID: guild.id });
			if (!GuildData) {
				await guildModel.findOneAndDelete({ guildID: guild.id });
			}
			QueueData = await queueModel.find({ guildID: guild.id });
			if(QueueData) {
				await queueModel.deleteMany({ guildID: guild.id });
			}
		} catch (err) { utils.log(err); }
	}
};