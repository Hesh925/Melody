const commandModel = require("../../models/command.schema.js");
const config = require("../../config/CONFIG.json");
const ezcolor = require("djs-easy-color");
const utils = require("djs-utils");
module.exports = {
	name: "interactionCreate",
	execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, interaction) {
		async function incDBData(command) {
			let CommandData;
			try {
				CommandData = await commandModel.findOne({ command: command.name });
				if (!CommandData) {
					utils.log(`No command data found for: ${ command.name } `);
					const commandSchema = await commandModel.create({
						command: command.name,
						category: command.category
					});
					commandSchema.save().then(utils.log(`Command data saved for: ${ command.name }`));
				} 
			} catch (err) { utils.log(err); }
			await commandModel.findOneAndUpdate({ command: command.name }, { $inc: { slashused: 1 }});
		}
		async function executeCommand(command) {
			await interaction.deferReply();
			//incDBData(command);
			command.execute(client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
		}

		const command = client.commands.get(interaction.commandName);
		if (!command) interaction.reply("An error has occurred please try again");

		function checkBotOwnerOnly() { // Checks if the user is bot owner if command is bot owner only
			if (command.botOwnerOnly) { // Check if command is bot owner only
				if (interaction.user.id === config.BotOwnerID) return true; // Is bot owner
				else return false; // Is not bot owner
			} else return true; // Not a bot owner only command
		}

		function checkOwnerOnly() { // Checks if the user is owner if command is owner only
			if (command.ownerOnly) { // Check if command is owner only
				if (interaction.user.id === interaction.member.guild.ownerID) return true; // User is Owner
				else return false; // User is not owner
			} else return true; // Command is not owner only
		}

		function checkDisabled() { // Checks if the command is disabled
			if (command.disabled) { // Checks if command is disabled
				return false; // Disabled
			} else return true; // Enabled
		}

		function checkUserPerms() { // Checks if the command is disabled
			if (command.userPerms !== [] ) {
				if (interaction.member.permissions.has(command.userPerms)) return true; // User has perms
				else return false; // User does not have perms
			} else return true; // Returns true if no perms are listed
		}

		function checkAll() { // Checks that the command can be executed
			if (checkDisabled()) { // Continues if not disabled
				if (checkBotOwnerOnly()) {
					if (checkOwnerOnly()) { // Continues if is owner or is not required to be owner
						if (checkUserPerms()) { // Continues if user has perms or if no perms are needed
							executeCommand(command);
						} else interaction.reply(`You do not have the proper permissions to run "${ command.name }"`);
					} else interaction.reply(`"${ command.name }" is an owner only command`);
				} else interaction.reply(`"${ command.name }" is an bot owner only command`);
			} else interaction.reply(`"${ command.name }" is currently disabled because "${ command.disabledReason }"`);
		}
		if (interaction.user.id === config.BotOwnerID) executeCommand(command);
		else checkAll();
	}
};