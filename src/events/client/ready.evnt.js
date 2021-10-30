const Package = require("../../../package.json");
const config = require("../../config/CONFIG.json");
const queueModel = require("../../models/queue.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "ready",
	once: true,
	execute(_Discord, client) {
		var date = new Date;
		var command = (Array.from(client.commands)).length;
		var event = (Array.from(client.events)).length;
		console.log(
			"I am ready!\n \n",
			`Bot Name:        "${ Package["name"] }"\n`,
			`Bot Version:     "${ Package["version"] }"\n`,
			`Bot Description: "${ Package["description"] }"\n`,
			`Bot Author:      "${ Package["author"] }"\n`,
			`Bot environment: "${ utils.searchArgv("env", true) === "dev" ? "DEV" : "PROD" }"\n\n`,
			`Bot online! Current time: ${ (date).toLocaleTimeString() }\n\n`,
			`Loaded ${ command } commands!\n`,
			`Loaded ${ event } events!\n`);
		utils.log("Bot started");
		utils.setRichPresence(client, config);
		
		
		if (utils.searchArgv("git")) {
			console.log("Process started successfully: Now exiting with code \"0\" ");
			process.exit(0);
		} //else {
		//	try {
		//		queueModel.collection.drop().then(console.log(" Dropped queue collection\n"));
		//	} catch(err) {
		//		console.log("Could not drop queue collection");
		//		console.log(err);
		//	}
		//}
	}
};