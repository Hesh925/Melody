/* eslint-disable capitalized-comments */
const { MessageEmbed } = require("discord.js");
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
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage) {

		const embed = new MessageEmbed()
			.setColor("BLUE")
			.setAuthor(`${ message.guild.name } Help Menu`, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(client.user.displayAvatarURL())
			.setFooter(`Requested by ${ message.author.username }`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
        
		if (args[0]) {
            
			const cmd = client.commands.get(args[0]) || client.commands.find(a => a.aliases && a.aliases.includes(args[0]));
			if (!cmd) {
				message.channel.send(`Invalid Command: \`${ args[0] }\``);
			} else {
				embed.setAuthor(`${ utils.capitalize(cmd.name) } Command Help`, client.user.displayAvatarURL());
				embed.addField("About", `
					**❯ Name:** ${ cmd.name }
					**❯ Aliases:** ${ cmd.aliases.length ? cmd.aliases.map(alias => `\`${ alias }\``).join(" ") : "No Aliases" }
					**❯ Description:** ${ cmd.description }
					**❯ Category:** ${ utils.capitalize(cmd.category) }
					**❯ Arguments:** ${ Object.keys(cmd.args).length !== 0 ? Object.keys(cmd.args).length : "No Arguments" }
					**❯ Usage:** ${ config.PREFIX }${ cmd.name } ${ cmd.usage }
					**❯ Required Permissions:** ${ cmd.userPerms.length ? `[${ cmd.userPerms }]` : "No Permissions" }
					**❯ OwnerOnly:** ${ utils.capitalize(cmd.ownerOnly) }
					**❯ NSFW:** ${ utils.capitalize(cmd.nsfw) }`
					// **❯ Is Disabled:** ${ utils.capitalize(cmd.disabled) }`
				);
				// console.log(Object.keys(cmd.args).length);
				// eslint-disable-next-line no-undefined
				if(Object.keys(cmd.args).length !== 0) {
					embed.addField("**Arguments**", "\u200b");
					Object.keys(cmd.args).forEach(element => {
						const version = cmd.args[element];
						embed.addField(`**❯ ${ utils.capitalize(element) }:**`, `\u200b ${ version }`);
					});
				}
				message.channel.send( {embeds: [ embed ] } );
			}
		} else {
			embed.setDescription(
				`These are the available commands for ${ message.guild.name }`,
				`The bots prefix is: "${ config.PREFIX }"`,
				"Command Parameters: `<>` is strict & `[]` is optional"
			);
			let categories;
			if (message.author.id !== message.guild.ownerId) {
				categories = utils.removeDuplicates(client.commands.filter(cmd => cmd.category !== "owner" ).filter(cmd => cmd.category !== "botowner" ).map(cmd => cmd.category));
			} else {
				categories = utils.removeDuplicates(client.commands.filter(cmd => cmd.category !== "botowner" ).map(cmd => cmd.category));
			}
            
			for (const category of categories) {
				embed.addField(`**${ utils.capitalize(category) }**`, client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${ cmd.name }\``).join(" "));
			}
			message.channel.send( {embeds: [ embed ] } );
		}
	}
};