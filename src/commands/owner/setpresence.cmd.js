/* eslint-disable */
const {PermissionsBitField, SlashCommandBuilder, EmbedBuilder, ActivityType } = require("discord.js");
module.exports = {
	name: "setpresence",
	description: "Set the bot's presence",
	category: "",
	aliases: [], // type: Array
	userPerms: [], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("setpresence")
		.setDescription("set the bot's presence bot owner only")
		.addStringOption(option => option.setName("type").setDescription("The type of presence").setRequired(true).addChoices({name: "Playing", value: "playing"},{name: "Listening to", value: "listening"},{name: "Watching", value: "watching"}))
		.addStringOption(option => option.setName("text").setDescription("The text of the presence").setRequired(true)),
	execute: async (client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		let type = interaction.options.getString("type");
		let text = interaction.options.getString("text");

		if (type === "playing") {
			client.user.setPresence({
				activities: [{
					name: text,
					type: ActivityType.Playing
				}]
			});
		}

		if (type === "listening") {
			client.user.setPresence({
				activities: [{
					name: text,
					type: ActivityType.Listening
				}]
			});
		}

		if (type === "watching") {
			client.user.setPresence({
				activities: [{
					name: text,
					type: ActivityType.Watching
				}]
			});
		}
		interaction.editReply(`Presence set to ${type} ${text}`);
	}
};