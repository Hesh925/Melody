const ytsr = require("ytsr");
const ytdl = require("ytdl-core");

const guildModel = require("../../../models/guild.schema.js");
const queueModel = require("../../../models/queue.schema.js");

module.exports = {
	name: "idle",
	async execute(Discord, client, _config, utils, _colors, _opusEncoder, voicePlayer, DJSVoice, nowPlaying, oldState) {

		const guildRes = await guildModel.findOne({ guildID: oldState.resource.metadata.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		const queueRes = await queueModel.find({ guildID: oldState.resource.metadata.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		const queueLength = queueRes.length;
		
		const res = await queueModel.find({ guildID: oldState.resource.metadata.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		if (res !== null) { // Queue is not empty
			
			if (guildRes.loop === 0) { // Loop off

				utils.play(client, Discord.EmbedBuilder, DJSVoice, voicePlayer, res.guildID, res.textCID, res.songURL, nowPlaying, utils, ytsr, ytdl, null);

				await queueModel.findOneAndDelete({ guildID: oldState.resource.metadata.guildId }).sort({queuePos: 1}).limit(1);
				await guildModel.findOneAndUpdate({ guildID: oldState.resource.metadata.guildId }, { $inc: { songsInQueue: -1 }});

			} else if (guildRes.loop === 1) { // Loop song

				utils.play(client, Discord.EmbedBuilder, DJSVoice, voicePlayer, res.guildID, res.textCID, oldState.resource.metadata.url, nowPlaying, utils, ytsr, ytdl, null);

			} else { // Loop queue

				var queuePos = oldState.resource.metadata.queuePos + 1;
				if (queuePos > queueLength) { queuePos = 1; }
				const res = queueRes[queuePos - 1];

				utils.play(client, Discord.EmbedBuilder, DJSVoice, voicePlayer, oldState.resource.metadata.guildId, res.textCID, res.songURL, nowPlaying, utils, ytsr, ytdl, res);
			}

		} else { // Queue is empty
			if(oldState.status === "playing") {
				try { await guildModel.findOneAndUpdate({ guildID: oldState.resource.metadata.guildId }, { playing: false }); } catch (err) { utils.log(err); }
				console.log("Queue is empty");
			}
		}
	}
};