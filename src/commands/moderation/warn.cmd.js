const { Permissions } = require("discord.js");
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
	userPerms: [ Permissions.FLAGS.KICK_MEMBERS ], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [ 
		{"User":   { name: "user",   description: "What user would you like to warn", required: true }},
		{"String": { name: "reason", description: "Reason for warn", required: true }}
	],
	run: async (client, message, args, Discord, _colors, _config, ezcolor, utils) => {
		function sendWarnEmbed(warnID, userID, reason, dateNow){
			const embed = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`**Warned ${ client.users.cache.get(userID).tag }**
						**Reason:** ${ reason }
						**Warned By:** ${ message.author.username }
						**Date:** ${ date.format(dateNow, ( "MM/DD/YYYY hh:MM:ss A")) }
						**Warning ID:** ${ warnID }`)
				.setTimestamp();
			message.channel.send({ embeds: [ embed ] });
		}
		
		if(args[0]){
			const user = args[0]; // <@!882121214213111879> 2/21 ~warn <@!882121214213111879> testing testing testing
			const userID = user.endsWith(">") ? user.slice(3, 21) : user;
			if(userID.length === 18 && !isNaN(userID)) {
				const reason = args[1] ? args.slice(1).join().replace(/,/g, " ") : "No reason provided";
				const dateNow = new Date();
		
				if(userID !== client.user.id){
					try {
						const warnID = sha.sha224(userID + message.author.id + message.guildId + date.format(dateNow, ( "MM/DD/YYYY hh:MM:ss A")));
						const warnSchema = await warnModel.create({
							guildID: message.guildId,
							userID: userID,
							warnID: warnID,
							warnedBy: message.author.id,
							reason: reason,
							date: dateNow
						});
						warnSchema.save().then(sendWarnEmbed(warnID, userID, reason, dateNow));
						await userModel.findOneAndUpdate({ userID: userID }, { $inc: { warns: 1 } });
					} catch (err) {
						utils.log(err);
						message.channel.send("An error has occurred while trying to warn user please try again");
					}
				}else {
					const embed = new Discord.MessageEmbed()
						.setDescription("ERROR: You can not warn me")
						.setColor(ezcolor.getColor("HEX", "red"));
					message.channel.send({ embeds: [ embed ] });
				}
			} else {
				message.channel.send("Invalid user ID provided");
			}
		} else {
			message.channel.send("You need to provide a user ID or mention a user");
		}
	},
	slash: async (client, interaction, _args, Discord, _colors, _config, ezcolor, utils) => {

		const user =   interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");
		const dateNow = new Date();

		function sendWarnEmbed(warnID){
			const embed = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`**Warned ${ user.tag }**
						**Reason:** ${ reason }
						**Warned By:** ${ interaction.user.username }
						**Date:** ${ date.format( dateNow, ( "MM/DD/YYYY hh:MM:ss A")) }
						**Warning ID:** ${ warnID }`)
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
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
				interaction.editReply("An error has occurred while trying to warn user please try again").then( utils.pm2.compInt() );
			}
		} else {
			const embed = new Discord.MessageEmbed()
				.setDescription("ERROR: You can not warn me")
				.setColor(ezcolor.getColor("HEX", "red"));
			interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
		}
	}
};