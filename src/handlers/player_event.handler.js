const fs = require("fs");
module.exports = (client, Discord, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
	const eventFiles = fs.readdirSync("./src/events/player").filter(file => file.endsWith(".evnt.js"));

	for (const file of eventFiles) {
		const event = require(`../events/player/${ file }`);
		client.playerEvents.set(event);

		if (event.once) {
			voicePlayer.once(event.name, (...args) => event.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, ...args));
		} else {
			voicePlayer.on(event.name, (...args) => event.execute(Discord, client, config, utils, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, ...args));
		}
	}
};