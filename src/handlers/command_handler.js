const fs = require("fs");
module.exports = (client) => {

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
		} else {
			continue;
		}
	}

};
