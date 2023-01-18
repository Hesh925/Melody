/* eslint-disable prefer-named-capture-group, no-bitwise, no-redeclare */
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");

module.exports = {
	name: "play",
	description: "play a track in the current voice",
	category: "music",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true,
	slashData: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a track in the current voice")
		.addStringOption( option => option.setName("song").setDescription("title or URL for the song you want to play").setRequired(true) ),

	execute: async (client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const guildID = interaction.guildId;
		const textCID = interaction.channelId;

		const searchFor = interaction.options.getString("song");

		async function join() {
			const voiceChannel = interaction.member.voice.channel;
			const guild = interaction.member.guild;

			if (interaction.member.voice.channel !== null) {

				DJSVoice.joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: guild.id,
					adapterCreator: guild.voiceAdapterCreator,
				});

			} else {
				interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true });
			}
		}

		if (interaction.member.voice.channel !== null) {
			if(voicePlayer.state.status !== "playing") {
				join();
				utils.play(client, EmbedBuilder, DJSVoice, voicePlayer, guildID, textCID, searchFor, nowPlaying, utils, ytsr, ytdl, null);
			} else {
				interaction.editReply({ content: "A song is already playing use the \"playnow\" or \"queue\" command", ephemeral: true });
			}
		} else {
			interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true });
		}
	}
};