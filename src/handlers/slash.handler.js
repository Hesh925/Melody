const fs = require("fs");
const commandModel = require("../models/command.schema.js");

const config = require("../config/CONFIG.json");

module.exports = (client, _Discord, _config, utils) => {
	async function setDBData(command) {
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

	var commandJSON = [];

	for (const file of commandFiles) {
		let command;
		if (Array.isArray(file)) command = require(`../commands/${ file[0] }/${ file[1] }`);
		else command = require(`../commands/${ file }`);
		if (command.name) {
			if("slashData" in command) {
				if("execute" in command) {

					client.commands.set(command.slashData.name, command);
					commandJSON.push(command.slashData.toJSON());
					setDBData(command);
					
				} else { console.log(`[WARNING] The command ${ command.name } is missing a required "execute" property.`); }
			} else { console.log(`[WARNING] The command ${ command.name } is missing a required "slashData" property.`); }
		}
	}

	client.once("ready", () => {

		if(config.pushSlashToGlobal){

			client.application.commands.set(commandJSON).then(slashCommandData => {

				console.log("Using global upload, could take up to 1 hour until commands are changed/added".yellow);
				console.log(`${ slashCommandData.size } Slash Commands ${ `(With ${ slashCommandData.map(d => d.options).flat().length } Subcommands)`.green } Loaded for all: ${ "All possible Guilds".underline }`.brightGreen);

			}).catch((error) => console.log(error));

		} else {
			try{
				var guild = client.guilds.cache.get(config.TESTING_GUILD.ID);
				guild.commands.cache.forEach(command => { command.delete(); });
				
				guild.commands.set(commandJSON)
					.then(slashCommandsData => {
						console.log(`${ slashCommandsData.size } Slash Commands ${ `(With ${ slashCommandsData.map(d => d.options).flat().length } Subcommands)`.green } Loaded for: ${ `${ guild.name }`.underline }`.brightGreen); 
					}).catch((error) => console.log(error));
			} catch(error){
				console.log(String(error).grey);
			}
		}
	});
};