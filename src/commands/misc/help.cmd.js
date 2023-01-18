/* eslint-disable capitalized-comments */
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: "help",
	description: "Displays the help screen for a command",
	usage: "[command]",
	args: {}, 
	category: "utilities",
	aliases: [ "h" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Displays the help screen for a command or bot")
		.addStringOption(option => option.setName("command").setDescription("What command do you need help with?").setRequired(false)),

	execute: async (client, interaction, _Discord, _colors, config, _ezcolor, utils) => {
		
		const embed = new EmbedBuilder()
			.setColor("BLUE")
			.setAuthor(`${ interaction.member.guild.name } Help Menu`, interaction.member.guild.iconURL({ dynamic: true }))
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter(`Requested by ${ interaction.user.username }`, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		const commandName = interaction.options.getString("command");
		if (commandName) {
            
			const cmd = client.commands.get(commandName) || client.commands.find(a => a.aliases && a.aliases.includes(commandName));
			if (!cmd) {
				interaction.editReply(`Invalid Command: \`${ commandName }\``);
			} else {
				embed.setAuthor(`${ utils.capitalize(cmd.name) } Command Help`, client.user.displayAvatarURL());
				embed.addFields({name: "About", value: `
					**❯ Name:** ${ cmd.name }
					**❯ Description:** ${ cmd.description }
					**❯ Category:** ${ utils.capitalize(cmd.category) }
					**❯ Required Permissions:** ${ cmd.userPerms.length ? `[${ cmd.userPerms }]` : "No Permissions" }
					**❯ OwnerOnly:** ${ utils.capitalize(cmd.ownerOnly) }
					**❯ NSFW:** ${ utils.capitalize(cmd.nsfw) }`});
				interaction.editReply( {embeds: [ embed ] } );
			}
		} else {
			embed.setDescription(
				`These are the available commands for ${ interaction.member.guild.name }`,
			);
			let categories;
			if (interaction.user.id !== interaction.member.guild.ownerId) {
				categories = utils.removeDuplicates(client.commands.filter(cmd => cmd.category !== "owner" ).filter(cmd => cmd.category !== "botowner" ).map(cmd => cmd.category));
			} else {
				categories = utils.removeDuplicates(client.commands.filter(cmd => cmd.category !== "botowner" ).map(cmd => cmd.category));
			}
            
			for (const category of categories) {
				embed.addField(`**${ utils.capitalize(category) }**`, client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${ cmd.name }\``).join(" "));
			}
			interaction.editReply( {embeds: [ embed ] } );
		}
	}
};