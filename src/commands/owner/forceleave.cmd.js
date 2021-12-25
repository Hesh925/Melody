module.exports = {
	name: "forceleave",
	description: "Forces the bot to leave a guild",
	usage: "<GuildID>",
	args: {},
	category: "owner",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: false,
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
		interaction.editReply("How the fuck are you seeing this?");
	}
};