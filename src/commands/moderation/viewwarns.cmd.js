const { PermissionsBitField, SlashCommandBuilder } = require("discord.js");
const warnModel = require("../../models/warning.schema");
const date = require("date-and-time");

module.exports = {
	name: "viewwarns",
	description: "View warns for a user",
	usage: "<user>", // <> is strict & [] is optional
	args: {},
	category: "moderation",
	aliases: [ "vw" ], // type: Array
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [ {"User": { name: "user", description: "What user would you like look up", required: true }} ],
	run: async (client, message, args, Discord, _colors, _config, ezcolor) => {
		const user = args[0]; // <@!882121214213111879> 2/21 ~warn <@!882121214213111879> testing testing testing
		const userID = user.endsWith(">") ? user.slice(3, 21) : user;
		const warnRes = await warnModel.find({ userID: userID, guildID: message.guildId });
		if (warnRes.length !== 0 ) {
			if (warnRes.length <= 25 ) {
					
				const embed = new Discord.MessageEmbed()
					.setDescription(`${ client.users.cache.get(user.id).tag } has ${ warnRes.length } guild warns`)
					.setColor(ezcolor.getColor("HEX", "red"));
					
				for (const warn of warnRes) {
					embed.addField(`Date: ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						 **Reason:** ${ warn.reason }
						 **Warn ID:** ${ warn.warnID }`);
				}
					
				message.channel.send({ embeds: [ embed ] });
					
			} else {
				const embed = new Discord.MessageEmbed()
					
					.setDescription(`${ client.users.cache.get(user.id).tag } has ${ warnRes.length } guild warns
								ATTENTION: Too many warns to display on one page showing first 25`)
					.setColor(ezcolor.getColor("HEX", "red"));
					
				for (const warn of warnRes) {
					embed.addField(`**Date:** ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						 **Reason:** ${ warn.reason }
						 **Warn ID:** ${ warn.warnID }`);
				}
					
				message.channel.send({ embeds: [ embed ] });
			}
		} else {
			const embed = new Discord.MessageEmbed()
				.setDescription(`No warns found for ${ client.users.cache.get(userID).tag }`)
				.setColor(ezcolor.getColor("HEX", "red"));
				
			message.channel.send({ embeds: [ embed ] });
		}
	
	},

	slash: async (client, interaction, _args, Discord, _colors, _config, ezcolor, utils) => {
		const user = interaction.options.getUser("user");
		const warnRes = await warnModel.find({ userID: user.id, guildID: interaction.guildId });
		if (warnRes.length !== 0 ) {
			if (warnRes.length <= 25 ) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`${ client.users.cache.get(user.id).tag } has ${ warnRes.length } guild warns`)
					.setColor(ezcolor.getColor("HEX", "red"));
				for (const warn of warnRes) {
					embed.addField(`**Date:** ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						 **Reason:** ${ warn.reason }
						 **Warn ID:** ${ warn.warnID }`);
				}
				interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
	
			} else {
				const embed = new Discord.MessageEmbed()
					.setDescription(`${ client.users.cache.get(user.id).tag } has ${ warnRes.length } guild warns
							ATTENTION: Too many warns to display on one page showing first 25`)
					.setColor(ezcolor.getColor("HEX", "red"));
				for (const warn of warnRes) {
					embed.addField(`**Date:** ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						 **Reason:** ${ warn.reason }
						 **Warn ID:** ${ warn.warnID }`);
				}
				interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
			}
		} else {
			const embed = new Discord.MessageEmbed()
				.setDescription(`No warns found for ${ client.users.cache.get(user.id).tag }`)
				.setColor(ezcolor.getColor("HEX", "red"));
	
			interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
		}
	}
};