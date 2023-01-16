const { PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const warnModel = require("../../models/warning.schema");
const userModel = require("../../models/user.schema");
const date = require("date-and-time");
const sha = require("js-sha256");
module.exports = {
	name: "warn",
	description: "Warn a user",
	usage: "<user> <reason>", // <> is strict & [] is optional
	args: {},
	category: "moderation",
	aliases: [], // type: Array
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warn a user")
		.addUserOption(option => option.setName("user").setDescription("What user would you like to warn").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("Reason for warn").setRequired(true)),

	execute: async (client, interaction, Discord, _colors, _config, ezcolor, utils) => {

		const user =   interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const dateNow = new Date();

		function sendWarnEmbed(warnID){
			const embed = new EmbedBuilder()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`**Warned ${ user.tag }**
						**Reason:** ${ reason }
						**Warned By:** ${ interaction.user.username }
						**Date:** ${ date.format( dateNow, ( "MM/DD/YYYY hh:MM:ss A")) }
						**Warning ID:** ${ warnID }`)
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] });
		}
		
		if (user.id !== client.user.id){
	
			try {
				const warnID = sha.sha224(user.id + interaction.user.id + interaction.guildId + date.format(dateNow, ( "MM/DD/YYYY hh:MM:ss A")));

				const warnSchema = await warnModel.create({
					guildID: interaction.guildId,
					userID: user.id,
					warnID: warnID,
					warnedBy: interaction.user.id,
					reason: reason,
					date: dateNow
				});
				warnSchema.save().then(sendWarnEmbed(warnID));
				await userModel.findOneAndUpdate({ userID: user.id }, { $inc: { warns: 1 } });
			} catch (err) {
				utils.log(err);
				interaction.editReply("An error has occurred while trying to warn user please try again");
			}
		} else {
			const embed = new EmbedBuilder()
				.setDescription("ERROR: You can not warn me")
				.setColor(ezcolor.getColor("HEX", "red"));
			interaction.editReply({ embeds: [ embed ] });
		}
	}
};