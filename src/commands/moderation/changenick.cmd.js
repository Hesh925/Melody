
const {PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "changenick",
	description: "Change a user's nickname",
	category: "moderation",
	userPerms: [ PermissionsBitField.Flags.ChangeNickname ], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("changenick")
		.setDescription("Reset a user's nickname")
		.addUserOption(option => option.setName("user").setDescription("User to reset").setRequired(true)),

	execute: async (_client, interaction, _Discord, _colors, config) => {
		const user = interaction.options.getUser("user");
		const member = interaction.guild.members.cache.get(user.id);
		if (member) {
			if (member.permissions.has(PermissionsBitField.Flags.Administrator) || member.permissions.has(PermissionsBitField.Flags.ChangeNickname)) {
				const embed = new EmbedBuilder()
					.setColor(config.colors.red)
					.setTitle("Error")
					.setDescription("You can't reset this user's nickname");
				return interaction.editReply({ embeds: [ embed ] });
			} else {
				member.setNickname(null);
				const embed = new EmbedBuilder()
					.setColor(config.colors.green)
					.setTitle("Success")
					.setDescription(`Reset ${ user.tag }'s nickname`)
					.setTimestamp()
					.setFooter({ text: `Reset by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
				return interaction.editReply({ embeds: [ embed ] });
			}
		}
	}
};