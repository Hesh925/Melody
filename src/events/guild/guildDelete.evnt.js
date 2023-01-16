const guildModel = require("../../models/guild.schema.js");
const queueModel = require("../../models/queue.schema.js");

module.exports = {
	name: "guildCreate",
	async execute(_Discord, client, config, utils, _colors, _opusEncoder, _voicePlayer, _DJSVoice, _nowPlaying, guild) {
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
			utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, `left: ${ guild.id } `);
		} catch (err) { utils.log(err); }
	}
};