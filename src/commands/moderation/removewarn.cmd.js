const { PermissionsBitField, SlashCommandBuilder} = require("discord.js");
const warnModel = require("../../models/warning.schema");
const userModel = require("../../models/user.schema");
const date = require("date-and-time");

module.exports = {
	name: "removewarn",
	description: "Remove a users warn",
	usage: "<Warn ID>", // <> is strict & [] is optional
	args: {},
	category: "moderation",
	aliases: [ "rmwarn" ], // type: Array
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [ {"StringChoices": { name: "warn_id", description: "Warn ID can be found with viewwarns command", required: true }} ],
	run: async (client, message, args, Discord, _colors, _config, ezcolor, utils) => {
		const warnID = args[0];
		function sendEmbed(warn){
			const embed = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`Removed warn for user ${ client.users.cache.get(warn.userID).tag }`)
				.addField(`Date: ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
					`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
					 **Reason:** ${ warn.reason }
					 **Warn ID:** ${ warn.warnID }`)
				.setTimestamp();
			message.channel.send({ embeds: [ embed ] });
		}
		try {
			const warnRes = await warnModel.findOneAndDelete({ warnID: warnID });

			await userModel.findOneAndUpdate({ userID: warnRes.userID }, { $inc: { warns: -1 } }).then(sendEmbed(warnRes));

		} catch (err) {
			utils.log(err);
			message.channel.send("An error has occurred while trying to warn user please try again");
		}
	},

	slash: async (client, interaction, _args, Discord, _colors, _config, ezcolor, utils) => {
		const warnID = interaction.options.getString("warn_id");

		function sendEmbed(warn){
			const embed = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`Removed warn for user ${ client.users.cache.get(warn.userID).tag }`)
				.addField(`Date: ${ date.format(warn.date, ( "MM/DD/YYYY hh:MM:ss A")) }`,
					`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
					 **Reason:** ${ warn.reason }
					 **Warn ID:** ${ warn.warnID }`)
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
		}
		let warnRes;
		try {
			warnRes = await warnModel.findOneAndDelete({ warnID: warnID, guildID: interaction.guildId });
			if(warnRes) {
				await userModel.findOneAndUpdate({ userID: warnRes.userID }, { $inc: { warns: -1 } }).then(sendEmbed(warnRes));
			} else {
				interaction.editReply("A warn with that ID does not exist").then( utils.pm2.compInt() );
			}


		} catch (err) {
			utils.log(err);
			interaction.editReply("An error has occurred while trying to remove warn please try again").then( utils.pm2.compInt() );
		}
	}
};