const fs = require("fs");
// Loads all events from the events folder

module.exports = (client, Discord, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
	const loadDir = (dirs) => {
		const eventFiles = fs.readdirSync(`./src/events/${ dirs }`).filter(file => file.endsWith(".evnt.js"));

		for (const file of eventFiles) {
			const event = require(`../events/${ dirs }/${ file }`);
			client.events.set(event);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, ...args));
			} else {
				client.on(event.name, (...args) => event.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, ...args));
			}
		}
	};
	[ "client", "guild" ].forEach(e => loadDir(e));
};