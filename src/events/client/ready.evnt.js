/* eslint-disable */
const Package = require("../../../package.json");
const config = require("../../config/CONFIG.json");
const queueModel = require("../../models/queue.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "ready",
	once: true,
	execute(_Discord, client, colors) {
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
	}
};