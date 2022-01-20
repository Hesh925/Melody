const { Permissions } = require("discord.js");
const warnModel = require("../../models/warning.schema");
module.exports = {
	name: "viewwarns",
	description: "View warns for a user",
	usage: "<user>", // <> is strict & [] is optional
	args: {},
	category: "moderation",
	aliases: [ "vw" ], // type: Array
	userPerms: [ Permissions.FLAGS.KICK_MEMBERS ], // type: Array
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
		console.log(warnRes.length);
		if (warnRes.length !== 0 ) {
			if (warnRes.length <= 25 ) {

				const embed = new Discord.MessageEmbed()
					.setDescription(`Warns for ${ client.users.cache.get(userID).tag }`)
					.setColor(ezcolor.getColor("HEX", "red"));

				for (const warn of warnRes) {
					embed.addField(`**Reason:** ${ warn.reason }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						**Guild Warn Number** ${ warn.warnNumber }
						**Global Warn Number** ${ warn.globalWarnNumber }`);
				}

				message.channel.send({ embeds: [ embed ] });

			} else {
				const embed = new Discord.MessageEmbed()

					.setDescription(`Warns for ${ client.users.cache.get(userID).tag }
						ATTENTION: Too many warns to display on one page showing first 25`)
					.setColor(ezcolor.getColor("HEX", "red"));

				for (const warn of warnRes) {
					embed.addField(`**Reason:** ${ warn.reason }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						**Guild Warn Number** ${ warn.warnNumber }
						**Global Warn Number** ${ warn.globalWarnNumber }`);
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
		console.log(warnRes.length);
		if (warnRes.length !== 0 ) {
			if (warnRes.length <= 25 ) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Warns for ${ client.users.cache.get(user.id).tag }`)
					.setColor(ezcolor.getColor("HEX", "red"));
				for (const warn of warnRes) {
					embed.addField(`**Reason:** ${ warn.reason }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						**Guild Warn Number** ${ warn.warnNumber }
						**Global Warn Number** ${ warn.globalWarnNumber }`);
				}
				interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );

			} else {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Warns for ${ client.users.cache.get(user.id).tag }
						ATTENTION: Too many warns to display on one page showing first 25`)
					.setColor(ezcolor.getColor("HEX", "red"));
				for (const warn of warnRes) {
					embed.addField(`**Reason:** ${ warn.reason }`,
						`**Warned By:** ${ client.users.cache.get(warn.warnedBy).tag }
						**Guild Warn Number** ${ warn.warnNumber }
						**Global Warn Number** ${ warn.globalWarnNumber }`);
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