/* eslint-disable */
const { PermissionsBitField, SlashCommandBuilder} = require("discord.js");
const queueModel = require("../../models/queue.schema.js");
module.exports = {
	name: "test",
	description: "123",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [], // type: Array
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String
	allowSlash: true,  // type: Boolean
	options: [],
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		console.log(interaction.user.id)
		interaction.editReply("Not set up yet").then( utils.pm2.compInt() );
	}
};