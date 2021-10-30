const fs = require("fs");
const utils = require("djs-utils");
const commandModel = require("../models/command.schema.js");

module.exports = (client) => {
	async function setDBData(command) {
		let CommandData;
		try {
			CommandData = await commandModel.findOne({ command: command.name });
			if (!CommandData) {
				utils.log(`No command data found for: ${ command.name }`);
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

	for (const file of commandFiles) {
		let command;
		if (Array.isArray(file)) {
			command = require(`../commands/${ file[0] }/${ file[1] }`);
		} else {
			command = require(`../commands/${ file }`);
		}
		if (command.name) {
			client.commands.set(command.name, command);
			setDBData(command);
		} else {
			continue;
		}
	}

};
