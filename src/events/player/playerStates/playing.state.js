const guildModel = require("../../../models/guild.schema.js");
const utils = require("djs-utils");

module.exports = {
	name: "playing",
	async execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueArray, nowPlaying, oldState, newState) {
		console.log(this.name);
		try { await guildModel.findOneAndUpdate({ guildID: newState.resource.metadata.guildId }, { playing: true }); } catch (err) { utils.log(err); }
	}
};