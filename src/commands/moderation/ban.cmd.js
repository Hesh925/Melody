/* eslint-disable */
const {PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "ban",
	description: "Ban a user from the guild",
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

	slashData: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a user from the guild"),

	execute: async (client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		interaction.editReply("Not set up yet");
	}
};