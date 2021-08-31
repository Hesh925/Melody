const fs = require("fs");
module.exports = (client, Discord) => {
	const loadDir = (dirs) => {
		const eventFiles = fs.readdirSync(`./src/events/${ dirs }`).filter(file => file.endsWith(".evnt.js"));

		for (const file of eventFiles) {
			const event = require(`../events/${ dirs }/${ file }`);
			const eventName = file.split(".")[0];
			if (event !== null) {
				client.events.set(event);
				client.on(eventName, event.bind(null, Discord, client));
			}
		}
	};
	[ "client", "guild" ].forEach(e => loadDir(e));
};
