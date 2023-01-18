
const {PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "resallnick",
	description: "Reset all nicknames in the guild",
	category: "moderation",
	userPerms: [ PermissionsBitField.Flags.ChangeNickname ], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("resetallnicknames")
		.setDescription("Reset all nicknames in the guild"),

	execute: async (_client, interaction, _Discord, _colors, config) => {
		const members = interaction.guild.members.cache;
		members.forEach(member => {
			if (member.permissions.has(PermissionsBitField.Flags.Administrator) || member.permissions.has(PermissionsBitField.Flags.ChangeNickname)) return;
			member.setNickname(null);
		});
		const embed = new EmbedBuilder()
			.setColor(config.colors.green)
			.setTitle("Success")
			.setDescription("Reset all nicknames in the guild")
			.setTimestamp()
			.setFooter({ text: `Reset by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
		return interaction.editReply({ embeds: [ embed ] });
	}
};