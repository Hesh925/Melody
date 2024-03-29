const { PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const warnModel = require("../../models/warning.schema");
const date = require("date-and-time");

module.exports = {
	name: "viewwarns",
	description: "View warns for a user",
	category: "moderation",
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("viewwarns")
		.setDescription("View warns for a user")
		.addUserOption(option => option.setName("user").setDescription("What user would you like look up").setRequired(true)), // Update this if no user use interaction.user.id

	execute: async (client, interaction, Discord, _colors, _config, ezcolor) => {

		const user = interaction.options.getUser("user");

		const warnRes = await warnModel.find({ userID: user.id, guildID: interaction.guildId });

		const embed = new EmbedBuilder();

		if (warnRes.length !== 0 ) {

			if (warnRes.length <= 25 ) {
				
				embed.setDescription(`${ client.users.cache.get(user.id).tag } has ${ warnRes.length } guild warns`);
				embed.setColor(ezcolor.getColor("HEX", "red"));
				
				for (const warn of warnRes) {
					
					embed.addFields({ name: `**Date:** ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
						value: `**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						 **Reason:** ${ warn.reason }
						 **Warn ID:** ${ warn.warnID }`});

				}
				interaction.editReply({ embeds: [ embed ] });
	
			} else {

				embed.setDescription(`${ client.users.cache.get(user.id).tag } has ${ warnRes.length } guild warns
							ATTENTION: Too many warns to display on one page showing first 25`);

				embed.setColor(ezcolor.getColor("HEX", "red"));

				for (const warn of warnRes) {

					embed.addFields({ name: `**Date:** ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
						value: `**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						 **Reason:** ${ warn.reason }
						 **Warn ID:** ${ warn.warnID }`});
				}
				interaction.editReply({ embeds: [ embed ] });
			}
		} else {
			embed.setDescription(`No warns found for ${ client.users.cache.get(user.id).tag }`);
			embed.setColor(ezcolor.getColor("HEX", "red"));
	
			interaction.editReply({ embeds: [ embed ] });
		}
	}
};