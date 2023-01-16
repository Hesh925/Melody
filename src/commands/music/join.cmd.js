const { SlashCommandBuilder } = require("discord.js");
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

	slashData: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Make bot join voice channel"),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, _utils, _opusEncoder, _voicePlayer, DJSVoice, _nowPlaying, bool) => {
		const voiceChannel = interaction.member.voice.channel;
		const guild = interaction.member.guild;
		if (interaction.member.voice.channel !== null) {
			DJSVoice.joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: guild.id,
				adapterCreator: guild.voiceAdapterCreator,
			});
			if (bool) {
				interaction.editReply({ content: `Joined ${ voiceChannel.name }`, ephemeral: true });
			}
		} else {
			if (bool) {
				interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true });
			}
		}
	}
};