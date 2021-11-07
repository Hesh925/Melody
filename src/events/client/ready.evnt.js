/* eslint-disable */
const Package = require("../../../package.json");
const config = require("../../config/CONFIG.json");
const queueModel = require("../../models/queue.schema.js");
const guildModel = require("../../models/guild.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "ready",
	once: true,
	async execute(_Discord, client, colors) {
		var date = new Date;
		var command = (Array.from(client.commands)).length;
		var event = (Array.from(client.events)).length;
		console.log(
			"I am ready!\n \n",
			`Bot Name:        "${ Package["name"] }"\n`.green,
			`Bot Version:     "${ Package["version"] }"\n`.green,
			`Bot Description: "${ Package["description"] }"\n`.green,
			`Bot Author:      "${ Package["author"] }"\n`.green,
			`Bot environment: "${ utils.searchArgv("env", true) === "dev" ? "DEV" : "PROD" }"\n\n`.green,
			`Bot online! Current time: ${ (date).toLocaleTimeString() }\n\n`.green,
			`Loaded ${ command } commands!\n`.green,
			`Loaded ${ event } events!\n`.green);
		utils.log("Bot started");
		utils.setRichPresence(client, config);
		
		
		if (utils.searchArgv("git")) {
			console.log("Process started successfully: Now exiting with code \"0\" ".bgGreen);
			process.exit(0);
		} // else {
		//	try {
		//		QueueModel.collection.drop().then(console.log(" Dropped queue collection\n"));
		//	} catch(err) {
		//		console.log("Could not drop queue collection");
		//		console.log(err);
		//	}
		// }
		const guilds = client.guilds.cache.map(guild => guild.id);
		for( const guild of guilds) {
			let GuildData;
			try {
				GuildData = await guildModel.findOne({ guildID: guild });
				if (!GuildData) {
					utils.log(`No guild data found for: ${ guild  }`);
					const guildSchema = await guildModel.create({
						guildID: guild,
						playing: false,
						loop: false,
						songsInQueue: 0,
						volume: 1
					});
					guildSchema.save().then(utils.log(`Guild data saved for: ${ guild }`));
				}
				try{
					await guildModel.findOneAndUpdate({ guildID: guild },
						{
							playing: false,
							loop: false 
						});
				} catch (err) { utils.log(err); }
			} catch (err) { utils.log(err); }
		}

	}
};