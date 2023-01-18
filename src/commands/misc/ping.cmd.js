const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "ping",
	description: "This is a ping command",
	category: "misc",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
 
	slashData: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("This is a ping command")
		.addStringOption(option => 
			option.setName("what_ping")
				.setDescription("What Ping do you want to get?")
				.setRequired(true)
				.addChoices({ name: "Bot", value: "botping" }, { name: "Discord Api", value: "api" })
		),

	execute: async (client, interaction) => {
		const StringOption = interaction.options.getString("what_ping");
		if(StringOption === "botping") { 
			await interaction.editReply({content: "Getting the Bot Ping...", ephemeral: true});
			interaction.editReply({content: `Bot Ping: \`${ Math.floor( interaction.createdTimestamp - Date.now() ) } ms\``, ephemeral: true});
		} else {
		    interaction.editReply({content: `Api Ping: \`${ Math.floor(client.ws.ping) } ms\``, ephemeral: true});
		}
	}
};