module.exports = {
	name: "SIGINT",
	execute(client, _Discord, config, utils, type, promise, reason) {
		console.log("[PROCESS] :: Multiple Resolves".red);
		utils.logToDiscord(client, config.errorReporting.guildId, config.errorReporting.textCId, "[PROCESS] :: Multiple Resolves");
		console.log(type, promise, reason);
	}
};
