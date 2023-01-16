module.exports = {
	name: "uncaughtExceptionMonitor",
	execute(client, _Discord, config, utils, err, origin) {
		console.log("[PROCESS] :: Uncaught Exception/Catch (MONITOR)".red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, "[PROCESS] :: Uncaught Exception/Catch (MONITOR)");
		console.log(err, origin);
	}
};
