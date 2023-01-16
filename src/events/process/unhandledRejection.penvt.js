module.exports = {
	name: "unhandledRejection",
	execute(client, _Discord, config, utils, reason, p) {
		console.log("[PROCESS] :: Unhandled Rejection/Catch".red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, "[PROCESS] :: Unhandled Rejection/Catch");
		console.log(reason, p);
	}
};
