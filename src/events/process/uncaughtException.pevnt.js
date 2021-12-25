module.exports = {
	name: "uncaughtException",
	execute(_client, _Discord, err, origin) {
		console.log("[PROCESS] :: Uncaught Exception/Catch".red);
		console.log(err, origin);
	}
};
