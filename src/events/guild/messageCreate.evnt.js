/* eslint-disable capitalized-comments, spaced-comment, no-undefined */
const config = require("../../config/CONFIG.json");
const timeout = config["messageDeleteTimeout"];
const ezcolor = require("djs-easy-color");
const utils = require("djs-utils");
const commandModel = require("../../models/command.schema.js");
const guildModel = require("../../models/guild.schema.js");
const userModel = require("../../models/user.schema.js");
const env = utils.searchArgv("env", true) === "dev" ? "dev" : "prod";

module.exports = {
	name: "messageCreate",
	async execute(Discord, client, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying, message) {
		if (message === undefined) return;
		utils.messageLog(message);

		if (!message.content.startsWith(config.envSettings[env].PREFIX) || message.author.bot) return; // Make sure message starts with prefix and author is not a bot
		
		message.suppressEmbeds(true);

		const args = message.content.slice(config.envSettings[env].PREFIX.length).split(/ +/);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return; // Make sure there is a command to search for
		const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd)); // Get command from collection

		async function incDBData() {
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
			await commandModel.findOneAndUpdate({ command: command.name }, { $inc: { timesused: 1 }});
		}

		async function updateGuild() {
			let GuildData;
			try {
				GuildData = await guildModel.findOne({ guildID: message.guildId });
				if (!GuildData) {
					utils.log(`No guild data found for: ${ message.guildId } `);
					const guildSchema = await guildModel.create({
						guildID: message.guildId
					});
					guildSchema.save().then(utils.log(`Guild data saved for: ${ message.guildId }`));
				} 
			} catch (err) { utils.log(err); }
		}

		async function updateUsers() {
			let userData;
			try {
				userData = await userModel.findOne({ userID: message.author.id });
				if (!userData) {
					utils.log(`No user data found for: ${ message.author.id } `);
					const userSchema = await userModel.create({
						userID: message.author.id
					});
					userSchema.save().then(utils.log(`User data saved for: ${ message.author.id }`));
				} 
			} catch (err) { utils.log(err); }
			await userModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { commandsUsed: 1 }});
		}
		

		function executeCommand() {
			updateGuild();
			updateUsers();
			incDBData();
			command.run(client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
		}

		function checkBotOwnerOnly() { // Checks if the user is bot owner if command is bot owner only
			if (command.botOwnerOnly) { // Check if command is bot owner only
				if (message.author.id === config.BotOwnerID) return true; // Is bot owner
				else return false; // Is not bot owner
			} else return true; // Not a bot owner only command
		}

		function checkOwnerOnly() { // Checks if the user is owner if command is owner only
			if (command.ownerOnly) { // Check if command is owner only
				if (message.author.id === message.guild.ownerID) return true; // User is Owner
				else return false; // User is not owner
			} else return true; // Command is not owner only
		}

		function checkNSFW() { // Checks if the channel is nsfw
			if (command.nsfw) { // Check if command is NSFW
				if (message.channel.nsfw) return true; // Channel is NSFW
			} else return true; // Command is not NSFW
		}

		function checkDisabled() { // Checks if the command is disabled
			if (command.disabled) { // Checks if command is disabled
				return false; // Disabled
			} else return true; // Enabled
		}

		function checkUserPerms() { // Checks if the command is disabled
			return true;
			//if (message.member.hasPermission(command.userPerms, true)) return true; // User has perms
			//else return false; // User does not have perms
		}

		function checkAll() { // Checks that the command can be executed
			if (checkDisabled()) { // Continues if not disabled
				if (checkBotOwnerOnly()) {
					if (checkOwnerOnly()) { // Continues if is owner or is not required to be owner
						if (checkNSFW()) { // Continues if used in NSFW channel or not NSFW command
							if (checkUserPerms()) { // Continues if user has perms or if no perms are needed
								executeCommand();
							} else message.reply(`You do not have the proper permissions to run "${ command.name }"`).then(message => {
								message.delete({
									timeout: timeout
								});
							});
						} else message.reply(`The "${ command.name }" command needs to be used in a NSFW channel`).then(message => {
							message.delete({
								timeout: timeout
							});
						});
					} else message.reply(`"${ command.name }" is an owner only command`).then(message => {
						message.delete({
							timeout: timeout
						});
					});
				} else message.reply(`"${ command.name }" is an bot owner only command`).then(message => {
					message.delete({
						timeout: timeout
					});
				});
			} else message.reply(`"${ command.name }" is currently disabled because "${ command.disabledReason }"`).then(message => {
				message.delete({
					timeout: timeout
				});
			});
		}
		if (message.author.id === config.BotOwnerID) {
			if (command) executeCommand();
			else {
				message.reply(`"${ cmd }" is not a valid command.`); // .then(message => { message.delete({ timeout: timeout }) });
			}
		} else {
			if (command) checkAll();
			else {
				message.reply(`"${ cmd }" is not a valid command.`); // .then(message => { message.delete({ timeout: timeout }) });
			}
		}
	}
};
