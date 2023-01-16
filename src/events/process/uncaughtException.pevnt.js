module.exports = {
	name: "uncaughtException",
	execute(client, _Discord, config, utils, err, origin) {
		console.log("[PROCESS] :: Uncaught Exception/Catch".red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, "[PROCESS] :: Uncaught Exception/Catch");
		console.log(err, origin);
	}
};
