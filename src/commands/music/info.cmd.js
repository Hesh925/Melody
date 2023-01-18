/* eslint-disable prefer-named-capture-group */

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	name: "info",
	description: "Get info about a video",
	category: "music",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Get info about a video")
		.addStringOption( option => option.setName("url").setDescription("URL to the video you want info on").setRequired(true) ),

	execute: async (_client, interaction, Discord, _colors, _config, _ezcolor, utils) => {
		const videoURL = interaction.options.getString("url");
		const videoData = await utils.ytSearch(videoURL);
		if (videoData !== null) {
			const embed = new EmbedBuilder()
				.setTitle(String(videoData.title))
				.setURL(videoData.url)
				.setAuthor({ name: "Video Info", iconURL: "https://cdn.discordapp.com/emojis/885100202202429450.png?v=1"})
				.addFields(
					{
						"name": "Video Info",
						"value":
								`**Title:** ${ videoData.title }
								 **Length:** ${ videoData.duration === null ? "Probably a livestream" : videoData.duration }
								 **Views:** ${ utils.numberWithCommas(videoData.views) }
								 **Uploaded:** ${ videoData.uploadedAt }`
					},
					{
						"name": "Video Author",
						"value":
								`**Name:** ${ videoData.author.name }
								 **Channel URL:** ${ videoData.author.url }`
					}
				)
				.setImage(videoData.bestThumbnail.url)
				.setColor("1049ed")
				.setFooter({ text: `Requested by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] });
		}
	}
};