/* eslint-disable */
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
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage) {
		// if(message.author.id === message.guild.ownerId) console.log("owner");
		// if(message.member.voice.channel !== null) console.log("in channel");
		// else console.log("not in channel");
		//voicePlayer.state.resource.playStream.setVolume(0.1);
		// queueMap.push("penis")
		// console.log(queueMap);
		// console.log(queueMap.indexOf("penis"));
		//const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection
		//console.log(typeof lastMessage)
		client.channels.cache.find(channel => channel.id === "898804533772320788").send("test")
	}
};