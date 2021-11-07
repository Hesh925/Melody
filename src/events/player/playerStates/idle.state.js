const utils = require("djs-utils");
const ezcolor = require("djs-easy-color");
const config = require("../../../config/CONFIG.json");

const guildModel = require("../../../models/guild.schema.js");
const queueModel = require("../../../models/queue.schema.js");

module.exports = {
	name: "idle",
	async execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState) {
		const guildRes = await guildModel.findOne({ guildID: oldState.resource.metadata.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		
		
		const res = await queueModel.find({ guildID: oldState.resource.metadata.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		if (res !== null) {
			client.commands.get("play").run(client, null, null, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying, res, null);
			if (!guildRes.loop) {
				await queueModel.findOneAndDelete({ guildID: oldState.resource.metadata.guildId }).sort({queuePos: 1}).limit(1);
				await guildModel.findOneAndUpdate({ guildID: oldState.resource.metadata.guildId }, { $inc: { songsInQueue: -1 }});
			}
		} else {
			if(oldState.status === "playing") {
				try { await guildModel.findOneAndUpdate({ guildID: oldState.resource.metadata.guildId }, { playing: false }); } catch (err) { utils.log(err); }
				console.log("finished playing");
			}
		}
	}
};