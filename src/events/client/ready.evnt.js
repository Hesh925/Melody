const Package = require("../../../package.json");
const config = require("../../config/CONFIG.json");
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
			`Bot environment: "${ process.argv.slice(2)[0] === "-dev" ? "DEV" : "PROD" }"\n\n`,
			`Bot online! Current time: ${ (date).toLocaleTimeString() }\n\n`,
			`Loaded ${ command } commands!\n`,
			`Loaded ${ event } events!\n`);
		utils.log("Bot started");
		
		utils.setRichPresence(client, config);

		if (process.argv[2] === "--git") {
			console.log("Process started successfully: Now exiting with code \"0\" ");
			process.exit(0);
		}
	}
};