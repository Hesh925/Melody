const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config/CONFIG.json");
module.exports = (client) => {
	const allCommands = [];
	function slashCommandBuild(command) {
		const slashCommand = new SlashCommandBuilder().setName(String(command.name).replace(/\s+/g, "_").toLowerCase()).setDescription(String(command.description));

		if(slashCommand.description) {
			if(command.options && command.options.length > 0){
				for(const option of command.options){

					if(option.User && option.User.name && option.User.description){

						slashCommand.addUserOption((op) =>
							op.setName(String(option.User.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.User.description).setRequired(option.User.required)
						);

					} else if(option.Integer && option.Integer.name && option.Integer.description){

						slashCommand.addIntegerOption((op) =>
							op.setName(String(option.Integer.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.Integer.description).setRequired(option.Integer.required)
						);

					} else if(option.String && option.String.name && option.String.description){

						slashCommand.addStringOption((op) =>
							op.setName(String(option.String.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.String.description).setRequired(option.String.required)
						);

					} else if(option.Channel && option.Channel.name && option.Channel.description){

						slashCommand.addChannelOption((op) =>
							op.setName(String(option.Channel.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.Channel.description).setRequired(option.Channel.required)
						);

					} else if(option.Role && option.Role.name && option.Role.description){

						slashCommand.addRoleOption((op) =>
							op.setName(String(option.Role.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.Role.description).setRequired(option.Role.required)
						);

					//} else if(option.StringChoices && option.StringChoices.name && option.StringChoices.description && option.StringChoices.choices && option.StringChoices.choices.length > 0){
//
					//	slashCommand.addStringOption((op) =>
					//		op.setName(String(option.StringChoices.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.StringChoices.description).setRequired(option.StringChoices.required)
					//			.addChoices(option.StringChoices.choices.map(c => [ String(c[0]).replace(/\s+/g, "_").toLowerCase(), String(c[1]) ] )),
					//	);

					} else if(option.IntChoices && option.IntChoices.name && option.IntChoices.description && option.IntChoices.choices && option.IntChoices.choices.length > 0){

						slashCommand.addStringOption((op) =>
							op.setName(String(option.IntChoices.name).replace(/\s+/g, "_").toLowerCase()).setDescription(option.IntChoices.description).setRequired(option.IntChoices.required)
								.addChoices(option.IntChoices.choices.map(c => [ String(c[0]).replace(/\s+/g, "_").toLowerCase(), parseInt(c[1]) ] )),
						);

					} else {
						console.log(`A Option is missing the Name or/and the Description of ${ command.name }`);
					}
				}
			}
			client.slashCommands.set(command.name, command);
			allCommands.push(slashCommand.toJSON());
		} else console.log(`The command "${ command.name }" does not have a valid description and will not be added to slash commands`.red);
	}
	
	function getDirectories() {
		return fs.readdirSync("./src/commands").filter(function subFolder(file) {
			return fs.statSync(`./src/commands/${  file }`).isDirectory();
		});
	}

	const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".cmd.js"));
	for (const folder of getDirectories()) {
		const folderFiles = fs.readdirSync(`./src/commands/${  folder }`).filter(file => file.endsWith(".cmd.js"));
		for (const file of folderFiles) {
			commandFiles.push([ folder, file ]);
		}
	}

	for (const file of commandFiles) {
		let command;
		if (Array.isArray(file)) command = require(`../commands/${ file[0] }/${ file[1] }`);
		else command = require(`../commands/${ file }`);
		
		if (command.name) {
			if (command.allowSlash) {
				slashCommandBuild(command);
			} else continue;
		} else continue;
	}

	client.once("ready", () => {
		if(config.pushSlashToGlobal){
			client.application.commands.set(allCommands).then(slashCommandData => {
				console.log("Using global upload, could take up to 1 hour until commands are changed/added".yellow);
				console.log(`${ slashCommandData.size } Slash Commands ${ `(With ${ slashCommandData.map(d => d.options).flat().length } Subcommands)`.green } Loaded for all: ${ "All possible Guilds".underline }`.brightGreen);
			}).catch((error) => console.log(error));
		} else {
			client.guilds.cache.map(g => g).forEach((guild) => {
				try{
					guild.commands.set(allCommands)
						.then(slashCommandsData => {
							console.log(`${ slashCommandsData.size } Slash Commands ${ `(With ${ slashCommandsData.map(d => d.options).flat().length } Subcommands)`.green } Loaded for: ${ `${ guild.name }`.underline }`.brightGreen); 
						}).catch((error) => console.log(error));
				} catch(error){
					console.log(String(error).grey);
				}
			});
		}
	});
};