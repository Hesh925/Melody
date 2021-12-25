module.exports = {
	name: "SIGINT",
	execute(_client, _Discord, type, promise, reason) {
		console.log("[PROCESS] :: Multiple Resolves".red);
		console.log(type, promise, reason);
	}
};
