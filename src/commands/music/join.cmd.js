module.exports = {
	name: "join",
	description: "Make bot join call",
	usage: "Join",
	args: {},
	category: "music",
	aliases: [ "j" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(_client, message, _args, _Discord, _config, _ezcolor, _utils, _opusEncoder, _voicePlayer, DJSVoice) {
		if (message.member.voice.channel !== null) {
			DJSVoice.joinVoiceChannel({
				channelId: message.member.voice.channel.id,
				guildId: message.channel.guild.id,
				adapterCreator: message.channel.guild.voiceAdapterCreator,
			});
		} else {
			message.channel.send("You must be in a voice channel to use this command");
		}
	}
};