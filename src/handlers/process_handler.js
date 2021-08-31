const fs = require("fs");
module.exports = (client, Discord) => {
	const eventFiles = fs.readdirSync("./src/events/process").filter(file => file.endsWith(".pevnt.js"));

	for (const file of eventFiles) {
		const event = require(`../events/process/${ file }`);
		const eventName = file.split(".")[0];
		if (event !== null) {
			client.events.set(event);
			process.on(eventName, event.bind(null, Discord, client));
		}
	}
};
