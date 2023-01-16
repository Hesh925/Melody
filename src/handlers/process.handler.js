const fs = require("fs");
module.exports = (client, Discord, config, utils) => {
	const eventFiles = fs.readdirSync("./src/events/process").filter(file => file.endsWith(".pevnt.js"));

	for (const file of eventFiles) {
		const event = require(`../events/process/${ file }`);
		client.events.set(event);

		if (event.once) {
			process.once(event.name, (...args) => event.execute(client, Discord, config, utils, ...args));
		} else {
			process.on(event.name, (...args) => event.execute(client, Discord, config, utils, ...args));
		}
	}
};