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
		const user = client.users.cache.get(message.author.id);

		if (!user) return message.channel.send("User not found");
		
		await user.send("message").catch(() => {
			message.channel.send("User has DMs closed or has no mutual servers with the bot:(");
		});
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
	}
};