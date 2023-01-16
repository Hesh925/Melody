const { SlashCommandBuilder } = require("discord.js");
const utils = require("djs-utils");
module.exports = {
	name: "forceleave", // type: String
	description: "Forces the bot to leave a guild", // type: String
	usage: "<GuildID>", // type: String
	args: {}, // type: Object
	category: "owner", // type: String
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String
	allowSlash: false, // type: Boolean
	options: [],
	run: async (client, message, args, _Discord, _colors, _config, _ezcolor, utils) => {
		if(args[0].length === 18) {
			const Guild = client.guilds.cache.find(guild => guild.id === args[0]);
			try {
				Guild.leave();
			} catch(err) { utils.log(err); }
		} else message.reply("You bust provide a valid guild id");
	},
	slash: async (_client, interaction) => {
		interaction.editReply("How the fuck are you seeing this?").then( utils.pm2.compInt() );
	}
};