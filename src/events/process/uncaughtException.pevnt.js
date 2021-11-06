module.exports = {
	name: "uncaughtException",
	execute(_client, _Discord, error) {
		console.log("oops");
		console.log(error);
	}
};
