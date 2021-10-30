/* eslint-disable */
const queueModel = require("../../models/queue.schema.js");
module.exports = {
	name: "test",
	description: "",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying) {
		const res = await queueModel.find({ guildID: message.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		// if(message.author.id === message.guild.ownerId) console.log("owner");
		// if(message.member.voice.channel !== null) console.log("in channel");
		// else console.log("not in channel");
		//voicePlayer.state.resource.playStream.setVolume(0.1);
		// queueMap.push("penis")
		// console.log(queueMap.indexOf("penis"));
		//const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		//console.log(typeof lastMessage)
		client.guilds.cache.find(guild => guild.id === res.guildID).channels.cache.find(channel => channel.id === res.textCID).send("test");
	}
};