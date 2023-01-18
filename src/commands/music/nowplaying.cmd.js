/* eslint-disable prefer-named-capture-group */
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "nowplaying",
	description: "Displays the song that is currently playing",
	usage: "",
	args: {},
	category: "music",
	aliases: [ "np" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	slashData: new SlashCommandBuilder()
		.setName("nowplaying")
		.setDescription("Displays the song that is currently playing"),

	execute: async (_client, interaction, Discord, _colors, _config, _ezcolor, utils, _opusEncoder, _voicePlayer, _DJSVoice, nowPlaying) => {
		const videoData = nowPlaying["0"];
		if (videoData !== null) {
			const embed = new EmbedBuilder()
				.setTitle(String(videoData.title))
				.setURL(videoData.url)
				.setAuthor("Now Playing:")
				.setDescription(`**Title:** ${ videoData.title }
						**Length:** ${ videoData.duration === null ? "Probably a livestream" : videoData.duration }
						**Views:** ${ utils.numberWithCommas(videoData.views) }
						**Uploaded:** ${ videoData.uploadedAt }`)
				.setImage(videoData.bestThumbnail.url)
				.setColor("1049ed")
				.setFooter({ text: `Requested by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] });
		}
	}
};