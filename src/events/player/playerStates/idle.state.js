const utils = require("djs-utils");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const guildModel = require("../../../models/guild.schema.js");
module.exports = {
	name: "idle",
	async execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, oldState, newState) {
		console.log(oldState);
		
		if(oldState.status === "playing") {
			try { await guildModel.findOneAndUpdate({ guildID: oldState.resource.metadata.guildId }, { playing: false }); } catch (err) { utils.log(err); }

			console.log("finished playing");
		}
	}
};