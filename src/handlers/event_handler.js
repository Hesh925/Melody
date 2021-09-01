const fs = require("fs");
module.exports = (client, Discord, opusEncoder, voicePlayer, DJSVoice) => {
	const loadDir = (dirs) => {
		const eventFiles = fs.readdirSync(`./src/events/${ dirs }`).filter(file => file.endsWith(".evnt.js"));

		for (const file of eventFiles) {
			const event = require(`../events/${ dirs }/${ file }`);
			client.events.set(event);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, ...args));
			} else {
				client.on(event.name, (...args) => event.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, ...args));
			}
		}
	};
	[ "client", "guild" ].forEach(e => loadDir(e));
};