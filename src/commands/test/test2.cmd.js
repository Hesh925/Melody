/* eslint-disable */
const io = require("@pm2/io");
const { SlashCommandBuilder } = require('@discordjs');
module.exports = {
	name: "test2",       // type: String
	description: "abc",  // type: String
	usage: "<> is strict & [] is optional", // type: String	
	args: {},            // type: Object
	category: "owner",   // type: String
	aliases: [],         // type: Array
	userPerms: [],       // type: Array
	ownerOnly: false,    // type: Boolean
	botOwnerOnly: true,  // type: Boolean
	nsfw: false,         // type: Boolean
	disabled: false,     // type: Boolean
	disabledReason: "",  // type: String
	allowSlash: false,   // type: Boolean
	options: [], 	     // type: Array
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		console.log(message.member.user)
	},

	slash: async (client, interaction, args, Discord, _colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		interaction.editReply("Not set up yet").then( utils.pm2.compInt() );
	}
};