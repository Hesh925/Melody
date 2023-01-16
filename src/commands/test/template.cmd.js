/* eslint-disable */
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "",
	description: "",
	usage: "", // <> is strict & [] is optional
	args: {},
	category: "",
	aliases: [], // type: Array
	userPerms: [], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String
	allowSlash: true,  // type: Boolean
	slashData: new SlashCommandBuilder()
		.setName(this.name)
		.setDescription(this.description),
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		console.log(this.name);
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		interaction.editReply("Not set up yet").then( utils.pm2.compInt() );
	}
};