module.exports = {
	name: "unhandledRejection",
	execute(_client, _Discord, reason, p) {
		console.log("[PROCESS] :: Unhandled Rejection/Catch".red);
		console.log(reason, p);
	}
};
