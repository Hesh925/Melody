module.exports = {
	name: "uncaughtExceptionMonitor",
	execute(_client, _Discord, err, origin) {
		console.log("[PROCESS] :: Uncaught Exception/Catch (MONITOR)".red);
		console.log(err, origin);
	}
};
