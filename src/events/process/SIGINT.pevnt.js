module.exports = {
	name: "SIGINT",
	execute() {
		console.log("[PROCESS] :: Shutting bot down".red);
		process.exit(0);
	}
};
