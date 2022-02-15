/* eslint-disable no-redeclare */
const { MessageEmbed, version: djsversion } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");
const guildModel = require("../../models/guild.schema.js");
const packageFile = require("../../../package.json");
const os = require("os");
const ms = require("ms");
module.exports = {
	name: "botinfo",
	description: "Get information about the bot",
	category: "utilities",
	usage: "",
	args: {},
	aliases: [ "bi" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [],
	run: async (client, message, args, _Discord, _colors, _config, ezcolor, utils) => {
		const guildRes = await guildModel.findOne({ guildID: message.guildId }).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const core = os.cpus()[0];
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "blue"))
				.addField("General", `
					**❯ Client:** ${ client.user.tag }
					**❯ Uptime:** ${ prettyMilliseconds(client.uptime, {compact: true}) }
					**❯ Version:** v${ packageFile["version"] }
					**❯ Node.js:** ${ process.version }
					**❯ Discord.js:** v${ djsversion }
					**❯ Dependencies:** ${ Object.keys(packageFile.dependencies).length }\u200b`)

				.addField("System", `
					**❯ Platform:** ${ process.platform }
					**❯ Uptime:** ${ ms(os.uptime() * 1000, { long: true }) }
					**❯ Process ID**: ${ process.pid }
					**❯ CPU:**
					\u3000 Cores: ${ os.cpus().length }
					\u3000 Model: ${ core.model }
					\u3000 Speed: ${ core.speed }MHz
					**❯ Memory:**
					\u3000 Total: ${ utils.formatBytes(process.memoryUsage().heapTotal) }
					\u3000 Used: ${ utils.formatBytes(process.memoryUsage().heapUsed) } `)

				.addField("Music player", `
				**❯ Songs in queue:** ${ guildRes.songsInQueue }
				**❯ Volume:** ${ guildRes.volume }
				**❯ Loop:** ${ guildRes.loop ? "Yes" : "No" }
				**❯ Playing:** ${ guildRes.playing ? "Yes" : "No" }`)

				.setTimestamp();
			message.channel.send({ embed: embed });
		} else if (args[0].toLowerCase() === "-d") {
			const embed = new MessageEmbed()
				.setTitle("Bot Dependencies")
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "blue"))
				.setTimestamp();

			Object.keys(packageFile.dependencies).forEach(element => {
				const version = packageFile.dependencies[element];
				if (version.startsWith("git+")) {
					embed.addField(`**❯ ${ element }:**`, version.slice(4));
				} else if (version.startsWith("^" || "~" || "<" || ">" || "<=" || ">=")) {
					embed.addField(`**❯ ${ element }:**`, version.slice(1));
				} else {
					embed.addField(`**❯ ${ element }:**`, version);
				}
			});
			message.channel.send({embed: embed});
		}
	},

	slash: async (client, interaction, _args, _Discord, _colors, _config, ezcolor, utils) => {
		const guildRes = await guildModel.findOne({ guildID: interaction.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(ezcolor.getColor("HEX", "blue"))
			.addField("General", `
				**❯ Client:** ${ client.user.tag }
				**❯ Uptime:** ${ prettyMilliseconds(client.uptime, {compact: true}) }
				**❯ Version:** v${ packageFile["version"] }
				**❯ Node.js:** ${ process.version }
				**❯ Discord.js:** v${ djsversion }
				**❯ Dependencies:** ${ Object.keys(packageFile.dependencies).length }\u200b`)

			.addField("System", `
				**❯ Platform:** ${ process.platform }
				**❯ Uptime:** ${ ms(os.uptime() * 1000, { long: true }) }
				**❯ Process ID**: ${ process.pid }
				**❯ CPU:**
				\u3000 Cores: ${ os.cpus().length }
				\u3000 Model: ${ core.model }
				\u3000 Speed: ${ core.speed }MHz
				**❯ Memory:**
				\u3000 Total: ${ utils.formatBytes(process.memoryUsage().heapTotal) }
				\u3000 Used: ${ utils.formatBytes(process.memoryUsage().heapUsed) } `)

			.addField("Music player", `
				**❯ Songs in queue:** ${ guildRes.songsInQueue }
				**❯ Volume:** ${ guildRes.volume }
				**❯ Loop:** ${ guildRes.loop ? "Yes" : "No" }
				**❯ Playing:** ${ guildRes.playing ? "Yes" : "No" }`)
				
			.setTimestamp();
		interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
	}
};