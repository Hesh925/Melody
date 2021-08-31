module.exports = (Discord, client, message) => {
	client.once("voiceStateUpdate", function(oldMember, newMember) {
		console.log(`a user changes voice state`);
	});
}