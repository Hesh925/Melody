/* eslint-disable */
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: "test2",
	description: "abc",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [],         // type: Array
	userPerms: [],       // type: Array
	ownerOnly: false,    // type: Boolean
	botOwnerOnly: true,  // type: Boolean
	nsfw: false,         // type: Boolean
	disabled: false,     // type: Boolean
	disabledReason: "",
	allowSlash: false, 
	options: [],
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		message.channel.send("test")
	},

	slash: async (client, interaction, args, Discord, _colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		interaction.reply("test")
	}
};