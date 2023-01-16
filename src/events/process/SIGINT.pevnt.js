module.exports = {
	name: "SIGINT",
	execute(client, _, config, utils) {
		console.log("[PROCESS] :: Shutting bot down".red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, "[PROCESS] :: Shutting bot down");
		process.exit(0);
	}
};
