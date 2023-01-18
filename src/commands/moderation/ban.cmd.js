const {PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "ban",
	description: "Ban a user from the guild",
	category: "moderation",
	userPerms: [ PermissionsBitField.Flags.BanMembers ], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a user from the guild")
		.addUserOption(option => option.setName("user").setDescription("The user to ban").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("The reason for the ban").setRequired(false)),

	execute: async (_client, interaction, _Discord, _colors, config) => {
		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason") || "No reason provided";
		const member = interaction.guild.members.cache.get(user.id);
		if (member) {
			if (member.permissions.has(PermissionsBitField.Flags.Administrator) || member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
				const embed = new EmbedBuilder()
					.setColor(config.colors.red)
					.setTitle("Error")
					.setDescription("You can't ban this user");
				return interaction.editReply({ embeds: [ embed ] });
			} else {
				member.ban({ reason: reason });
				const embed = new EmbedBuilder()
					.setColor(config.colors.green)
					.setTitle("Success")
					.setDescription(`Banned ${ user.tag } for ${ reason }`)
					.setTimestamp()
					.setFooter({ text: `Banned by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
				return interaction.editReply({ embeds: [ embed ] });
			}
		}
	}
};