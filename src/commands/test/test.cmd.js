/* eslint-disable */
const queueModel = require("../../models/queue.schema.js");
module.exports = {
	name: "test",
	description: "123",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [],
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		message.channel.send("test")
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		interaction.reply("weeners");
	}
};