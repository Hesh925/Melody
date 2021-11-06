module.exports = {
	name: "join",
	description: "Make bot join voice channel",
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
	allowSlash: true, 
	options: [],
	run: async (_client, message, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, _voicePlayer, DJSVoice) => {
		if (message.member.voice.channel !== null) {
			DJSVoice.joinVoiceChannel({
				channelId: message.member.voice.channel.id,
				guildId: message.channel.guild.id,
				adapterCreator: message.channel.guild.voiceAdapterCreator,
			});
		} else {
			message.channel.send("You must be in a voice channel to use this command");
		}
	},

	slash: async (_client, interaction, _args, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, _voicePlayer, DJSVoice, nowPlaying, bool) => {
		const voiceChannel = interaction.member.voice.channel;
		const guild = interaction.member.guild;
		if (interaction.member.voice.channel !== null) {
			DJSVoice.joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: guild.id,
				adapterCreator: guild.voiceAdapterCreator,
			});
			if (bool) {
				interaction.reply({ content: `Joined ${ voiceChannel.name }`, ephemeral: true });
			}
		} else {
			if (bool) {
				interaction.reply({ content: "You must be in a voice channel to use this command", ephemeral: true });
			}
		}
	}
};