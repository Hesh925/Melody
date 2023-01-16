/* eslint-disable no-await-in-loop */

const Package = require("../../../package.json");
const config = require("../../config/CONFIG.json");
const guildModel = require("../../models/guild.schema.js");
const userModel = require("../../models/user.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "ready",
	once: true,
	async execute(_Discord, client) {
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
		}
		 
		 const users = [];
		 client.guilds.cache.forEach(guild => {
			 guild.members.cache.forEach(member => {
				 users.push(member.user);
			});
		});
		for( const user of users ){
			let userData;
			try {
			   userData = await userModel.findOne({ userID: user.id });
			   if (!userData) {
				   utils.log(`No user data found for: ${ user.username }`);
				   const userSchema = await userModel.create({
					   userID: user.id,
					   userName: user.username,
					   isBot: user.bot,
					   isSystem: user.system
				   });
				   userSchema.save().then(utils.log(`User data saved for: ${ user.username }`));
			   } 
			} catch (err) { utils.log(err); }
		}


		const guilds = client.guilds.cache.map(guild => guild);
		for( const guild of guilds) {
			let GuildData;
			try {
				GuildData = await guildModel.findOne({ guildID: guild.id });
				if (!GuildData) {
					utils.log(`No guild data found for: ${ guild.name }`);
					const guildSchema = await guildModel.create({
						guildID: guild.id,
						guildName: guild.name, 
						playing: false,
						loop: false,
						songsInQueue: 0,
						volume: 1
					});
					guildSchema.save().then(utils.log(`Guild data saved for: ${ guild.name }`));
				}
				try{
					await guildModel.findOneAndUpdate({ guildID: guild.id },
						{
							playing: false,
							loop: false,
							songsInQueue: 0
						});
				} catch (err) { utils.log(err); }
			} catch (err) { utils.log(err); }
		}

	}
};
