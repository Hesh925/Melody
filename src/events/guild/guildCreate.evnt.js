const guildModel = require("../../models/guild.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "guildCreate",
	async execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, guild) {
		console.log(guild);
		let GuildData;
		try {
			GuildData = await guildModel.findOne({ guildID: guild.id });
			if (!GuildData) {
				utils.log(`No guild data found for: ${ guild.id } `);
				const guildSchema = await guildModel.create({
					guildID: guild.id,
					playing: false,
					songsInQueue: 0
				});
				guildSchema.save().then(utils.log(`Guild data saved for: ${ guild.id }`));
			} 
		} catch (err) { utils.log(err); }
	}
};