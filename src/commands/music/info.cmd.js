/* eslint-disable prefer-named-capture-group */

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
module.exports = {
	name: "info",
	description: "Get info about a video",
	usage: "<video name or url>",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a video')
		.addStringOption( option => option.setName('url').setDescription('URL to the video you want info on').setRequired(true) ),

	execute: async (_client, interaction, Discord, _colors, _config, _ezcolor, utils) => {
		const videoURL = interaction.options.getString("url");
		const videoData = await utils.ytSearch(videoURL);
		if (videoData !== null) {
			const embed = new EmbedBuilder()
				.setTitle(String(videoData.title))
				.setURL(videoData.url)
				.setAuthor("info")
				.addFields([
					{
						"name": "Video Info",
						"value":
								`**Title:** ${ videoData.title }
								 **Length:** ${ videoData.duration === null ? "Probably a livestream" : videoData.duration }
								 **Views:** ${ numberWithCommas(videoData.views) }
								 **Uploaded:** ${ videoData.uploadedAt }`
					},
					{
						"name": "Video Author",
						"value":
								`**Name:** ${ videoData.author.name }
								 **Channel URL:** ${ videoData.author.url }`
					}
				])
				.setImage(videoData.bestThumbnail.url)
				.setColor("1049ed")
				.setFooter(`Requested by: ${ interaction.user.username }`,  interaction.user.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] });
		}
	}
};