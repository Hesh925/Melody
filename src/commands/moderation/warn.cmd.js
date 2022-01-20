const { Permissions } = require("discord.js");
const warnModel = require("../../models/warning.schema");
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
		const user = args[0]; // <@!882121214213111879> 2/21 ~warn <@!882121214213111879> testing testing testing
		const userID = user.endsWith(">") ? user.slice(3, 21) : user;
		const reason = args.slice(1).join().replace(/,/g, " ");

		const warnRes = await warnModel.find({ userID: userID, guildID: message.guildId }).sort({warnNumber: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const warnNumber = warnRes !== null ? warnRes.warnNumber + 1 : 1;

		const globalWarnRes = await warnModel.find({ userID: userID }).sort({globalWarnNumber: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const globalWarnNumber = globalWarnRes !== null ? globalWarnRes.globalWarnNumber + 1 : 1;

		function sendWarnEmbed(){
			const embed = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`**Warned ${ client.users.cache.get(userID).tag }**
						**Reason:** ${ reason }
						**Warned By:** ${ message.author.username }
						**Guild Warn Number** ${ warnNumber }
						**Global Warn Number** ${ globalWarnNumber }`)
				.setTimestamp();
			message.channel.send({ embeds: [ embed ] });
		}
		try {
			const warnSchema = await warnModel.create({
				guildID: message.guildId,
				userID: userID,
				warnedBy: message.author.id,
				reason: reason,
				warnNumber: warnNumber,
				globalWarnNumber: globalWarnNumber
			});
			warnSchema.save().then(sendWarnEmbed());
		} catch (err) {
			utils.log(err);
			message.channel.send("An error has occurred while trying to warn user please try again");
		}
	},
	slash: async (client, interaction, _args, Discord, _colors, _config, ezcolor, utils) => {

		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");

		const warnRes = await warnModel.find({ userID: user.id, guildID: interaction.guildId }).sort({warnNumber: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const warnNumber = warnRes !== null ? warnRes.warnNumber + 1 : 1;
		console.log(warnRes);
		const globalWarnRes = await warnModel.find({ userID: user.id }).sort({globalWarnNumber: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const globalWarnNumber = globalWarnRes !== null ? globalWarnRes.globalWarnNumber + 1 : 1;
		console.log(globalWarnRes);

		function sendWarnEmbed(){
			const embed = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "red"))
				.setDescription(`**Warned ${ user.tag }**
						**Reason:** ${ reason }
						**Warned By:** ${ interaction.user.username }
						**Guild Warn Number** ${ warnNumber }
						**Global Warn Number** ${ globalWarnNumber }`)
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
		}
		try {
			const warnSchema = await warnModel.create({
				guildID: interaction.guildId,
				userID: user.id,
				warnedBy: interaction.user.id,
				reason: reason,
				warnNumber: warnNumber,
				globalWarnNumber: globalWarnNumber
			});
			warnSchema.save().then(sendWarnEmbed());
		} catch (err) {
			utils.log(err);
			interaction.editReply("An error has occurred while trying to warn user please try again").then( utils.pm2.compInt() );
		}
	}
};