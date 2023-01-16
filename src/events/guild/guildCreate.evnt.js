const guildModel = require("../../models/guild.schema.js");

module.exports = {
	name: "guildCreate",
	async execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, guild) {
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
				utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, `Joined: ${ guild.id } `);
			} 
		} catch (err) { utils.log(err); }
	}
};