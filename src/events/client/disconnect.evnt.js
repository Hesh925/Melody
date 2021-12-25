module.exports = {
	name: "disconnect",
	async execute() {
		console.log(`Bot Disconnected at ${ new Date() }.`.red);
	}
};