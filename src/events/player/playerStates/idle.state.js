const utils = require("djs-utils");
const ezcolor = require("djs-easy-color");
const config = require("../../../config/CONFIG.json");

const guildModel = require("../../../models/guild.schema.js");
const queueModel = require("../../../models/queue.schema.js");
module.exports = {
	name: "idle",
	async execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState, newState) {
		const res = await queueModel.find({ guildID: oldState.resource.metadata.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		if (res !== null) {
			client.commands.get("play").execute(client, null, null, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, res, nowPlaying);
		} else {
			if(oldState.status === "playing") {
				try { await guildModel.findOneAndUpdate({ guildID: oldState.resource.metadata.guildId }, { playing: false }); } catch (err) { utils.log(err); }
				console.log("finished playing");
			}
		}
	}
};