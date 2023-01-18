
const {PermissionsBitField, SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "purge",
	description: "Purge messages from a channel",
	category: "moderation",
	userPerms: [ PermissionsBitField.Flags.ManageMessages ], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("purge")
		.setDescription("Purge messages from a channel")
		.addChannelOption(option => option.setName("channel").setDescription("Channel to purge").setRequired(true))
		.addIntegerOption(option => option.setName("amount").setDescription("Amount of messages to purge").setMaxValue(100).setMinValue(1).setRequired(true)),

	execute: async (client, interaction) => {
		const channel = interaction.options.getChannel("channel");
		const amount = interaction.options.getInteger("amount");

		await channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			interaction.editReply("There was an error trying to purge messages in this channel!");
		}).then(interaction.editReply(`Successfully purged ${ amount } messages from ${ channel }`));
	}
};