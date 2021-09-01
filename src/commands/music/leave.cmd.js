module.exports = {
	name: "leave",
	description: "Make bot leave channel",
	usage: "",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	// eslint-disable-next-line no-unused-vars
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice) {
		const connection = DJSVoice.getVoiceConnection(message.guild.id); // Get connection  message.guild.me.voice.channel
		if(connection) {
			if (message.member.voice.channel) {
				if(message.member.voice.channel.id === connection.joinConfig.channelId) {
					connection.destroy();
				} else {
					message.channel.send("You must be in the same channel as the bot to use this command");
				}
			} else {
				message.channel.send("You must be in the same channel as the bot to use this command");
			}
		} else {
			message.channel.send("Bot is not connected to a voice channel");
		}
	}
};