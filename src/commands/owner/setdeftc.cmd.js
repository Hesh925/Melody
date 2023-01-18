const { SlashCommandBuilder } = require("discord.js");
const guildModel = require("../../models/guild.schema.js");
module.exports = {
	name: "setdeftc",
	description: "sets the default text channel",
	category: "owner",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String
	allowSlash: false,  // type: Boolean
	slashData: new SlashCommandBuilder()
		.setName("setdeftc")
		.setDescription("Sets the default text channel (Guild owner only)"),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils) => {
		try {
			guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { defaultTC: interaction.channelId }).then(interaction.editReply("Set default text channel"));
		} catch(err) { 
			utils.log(err); 
			interaction.editReply("Error setting default text channel");
		}
	}
};