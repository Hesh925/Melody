module.exports = {
	name: "resetrp",
	description: "Resets rich presence",
	usage: "",
	args: {},
	category: "misc",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: true, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) {
		
		utils.setRichPresence(client, config);
		message.channel.send("Reset Rich Presence");
	}
};