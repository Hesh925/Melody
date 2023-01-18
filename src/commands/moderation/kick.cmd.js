const {PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "kick",
	description: "Kick a user from the guild",
	category: "moderation",
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kick a user from the guild")
		.addUserOption(option => option.setName("user").setDescription("The user to kick").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("The reason for the kick").setRequired(false)),

	execute: async (_client, interaction, _Discord, _colors, config) => {
		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason") || "No reason provided";
		const member = interaction.guild.members.cache.get(user.id);
		if (member) {
			if (member.permissions.has(PermissionsBitField.Flags.Administrator) || member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
				const embed = new EmbedBuilder()
					.setColor(config.colors.red)
					.setTitle("Error")
					.setDescription("You can't kick this user");
				return interaction.editReply({ embeds: [ embed ] });
			} else {
				member.kick({ reason: reason });
				const embed = new EmbedBuilder()
					.setColor(config.colors.green)
					.setTitle("Success")
					.setDescription(`Kicked ${ user.tag } for ${ reason }`)
					.setTimestamp()
					.setFooter({ text: `Kick by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
				return interaction.editReply({ embeds: [ embed ] });
			}
		}
	}
};