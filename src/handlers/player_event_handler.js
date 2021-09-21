const fs = require("fs");
module.exports = (client, Discord, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying) => {
	const eventFiles = fs.readdirSync("./src/events/player").filter(file => file.endsWith(".evnt.js"));

	for (const file of eventFiles) {
		const event = require(`../events/player/${ file }`);
		client.events.set(event);
		if (event.once) {
			voicePlayer.once(event.name, (...args) => event.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, ...args));
		} else {
			voicePlayer.on(event.name, (...args) => event.execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, ...args));
		}
	}
};