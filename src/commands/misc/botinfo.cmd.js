/* eslint-disable no-redeclare */
const { MessageEmbed, version: djsversion } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");
const packagefile = require("../../../package.json");
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
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage) {
		const core = os.cpus()[0];
		if (!args[0]) {
			var embed = new MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor(ezcolor.getColor("HEX", "blue"))
				.addField("General", `
					**❯ Client:** ${ client.user.tag }
					**❯ Uptime:** ${ prettyMilliseconds(client.uptime, {compact: true}) }
					**❯ Version:** v${ packagefile["version"] }
					**❯ Node.js:** ${ process.version }
					**❯ Discord.js:** v${ djsversion }
					**❯ Dependencies:** ${ Object.keys(packagefile.dependencies).length }\u200b`)

				.addField("Music", `
				**❯ Songs in queue:** ${ queueMap.length ? queueMap.length : "No queue" }
				**❯ Player State:** ${ voicePlayer.state.status } `)

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
				.setTimestamp();
			message.channel.send( {embeds: [ embed ] } );
		} else {
			if (args[0].toLowerCase() === "-d") {
				var embed = new MessageEmbed()
					.setTitle("Bot Dependencies")
					.setThumbnail(client.user.displayAvatarURL())
					.setColor(ezcolor.getColor("HEX", "blue"))
					.setTimestamp();
                    
				Object.keys(packagefile.dependencies).forEach(element => {
					const version = packagefile.dependencies[element];
					if (version.startsWith("git+")) {
						embed.addField(`**❯ ${ element }:**`, version.slice(4));
					} else if (version.startsWith("^" || "~" || "<" || ">" || "<=" || ">=")) {
						embed.addField(`**❯ ${ element }:**`, version.slice(1));
					} else {
						embed.addField(`**❯ ${ element }:**`, version);
					}
				});
				message.channel.send( {embeds: [ embed ] } );
			}
		}
	}
};