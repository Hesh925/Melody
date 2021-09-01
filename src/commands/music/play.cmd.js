const { join } = require("path");
module.exports = {
	name: "play",
	description: "play a track in the current voice",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [ "p" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) {
		const cmdJoin = client.commands.get("join"); // Get join command
		cmdJoin.execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice); // Call join command 
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection

		connection.subscribe(voicePlayer); // Create subscription
		const resource = DJSVoice.createAudioResource(join(__dirname, "audio.mp3")); // Replace with fun to get data from YT
		voicePlayer.play(resource);
		try {
			await DJSVoice.entersState(voicePlayer, DJSVoice.AudioPlayerStatus.Playing, 5000);
			console.log("Playback has started!");
		} catch (error) {
			console.error(error);
		}

		// If (subscription) {
		// SetTimeout(() => { 
		// Subscription.unsubscribe(); // Stop playing audio
		// Connection.destroy(); // Destroy connection
		// }, 5000);
		// }
	}
};