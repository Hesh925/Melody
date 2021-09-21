const config = require("../../config/CONFIG.json");
const timeout = config["messageDeleteTimeout"];
const ezcolor = require("djs-easy-color");
const utils = require("djs-utils");
const env = process.argv.slice(2)[0] === "-dev" ? "dev" : "prod";

module.exports = {
	name: "messageCreate",
	async execute(Discord, client, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, message) {
		utils.messageLog(message);
		if (!message.content.startsWith(config.envSettings[env].PREFIX) || message.author.bot) return;

		const args = message.content.slice(config.envSettings[env].PREFIX.length).split(/ +/);
		const cmd = args.shift().toLowerCase();
		if (cmd.length === 0) return;
		const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));


		function executeCommand() {
			command.execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying);
		}

		function checkBotOwnerOnly() { // Checks if the user is bot owner if command is bot owner only
			if (command.botOwnerOnly) { // Check if command is bot owner only
				if (utils.isBotOwner(message)) return true; // Is bot owner
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
		if (utils.isBotOwner(message)) {
			if (command) executeCommand();
			else {
				var commandArray = new Array(client.commands);
				message.reply(`The command "${ cmd }" is not a valid command, Did you mean: ${ utils.fuzzySearch(cmd, commandArray, "name", client) }`); // .then(message => { message.delete({ timeout: timeout }) });
			}
		} else {
			if (command) checkAll();
			else {
				message.reply(`The command "${ cmd }" is not a valid command, Did you mean: ${ utils.fuzzySearch(cmd, commandArray, "name") }`); // .then(message => { message.delete({ timeout: timeout }) });
			}
		}
	}
};
