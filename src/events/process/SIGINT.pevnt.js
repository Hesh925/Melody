module.exports = {
	name: "SIGINT",
	execute() {
		console.log("Shutting bot down");
		process.exit(0);
	}
};
