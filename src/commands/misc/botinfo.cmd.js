/* eslint-disable no-redeclare */
const { version: djsversion, SlashCommandBuilder, EmbedBuilder} = require("discord.js");

const prettyMilliseconds = require("pretty-ms");
const guildModel = require("../../models/guild.schema.js");
const packageFile = require("../../../package.json");
const os = require("os");
const ms = require("ms");

module.exports = {
	name: "botinfo",
	description: "get information about the bot",
	category: "utilities",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("botinfo")
		.setDescription("Get information about the bot"),

	execute: async (client, interaction, _Discord, _colors, _config, ezcolor, utils) => {
		const guildRes = await guildModel.findOne({ guildID: interaction.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		
		const core = os.cpus()[0];
		const embed = new EmbedBuilder()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(ezcolor.getColor("HEX", "blue"))
			.addFields({name: "General", value: `
				**❯ Client:** ${ client.user.tag }
				**❯ Uptime:** ${ prettyMilliseconds(client.uptime, {compact: true}) }
				**❯ Version:** v${ packageFile["version"] }
				**❯ Node.js:** ${ process.version }
				**❯ Discord.js:** v${ djsversion }
				**❯ Dependencies:** ${ Object.keys(packageFile.dependencies).length }\u200b`})

			.addFields({name: "System", value:`
				**❯ Platform:** ${ process.platform === "win32" ? "Windows" : process.platform }
				**❯ Uptime:** ${ ms(os.uptime() * 1000, { long: true }) }
				**❯ Process ID**: ${ process.pid }
				**❯ CPU:**
				\u3000 Cores: ${ os.cpus().length }
				\u3000 Model: ${ core.model }
				\u3000 Speed: ${ core.speed }MHz
				**❯ Memory:**
				\u3000 Total: ${ utils.formatBytes(process.memoryUsage().heapTotal) }
				\u3000 Used: ${ utils.formatBytes(process.memoryUsage().heapUsed) } `})

			.addFields({name: "Music player", value: `
				**❯ Songs in queue:** ${ guildRes.songsInQueue }
				**❯ Volume:** ${ guildRes.volume }
				**❯ Loop:** ${ guildRes.loop ? "Yes" : "No" }
				**❯ Playing:** ${ guildRes.playing ? "Yes" : "No" }`})
				
			.setTimestamp();
		interaction.editReply({ embeds: [ embed ] });
	}
};