/* eslint-disable prefer-named-capture-group */
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
	allowSlash: true, 
	options: [ {"String": { name: "url", description: "URL to the video you want info on", required: true }} ],
	run: async (_client, message, args, Discord, _colors, _config, _ezcolor, utils) => {
		message.suppressEmbeds(true);
		if (args !== []) {
			console.log(args);
			const videoData = await utils.ytSearch(args);
			if (videoData !== null) {
				const embed = new Discord.MessageEmbed()
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
					.setFooter(`Requested by: ${ message.author.username }`,  message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp();
				message.channel.send({ embeds: [ embed ] });
			}
		}
	},

	slash: async (_client, interaction, _args, Discord, _colors, _config, _ezcolor, utils) => {
		const videoURL = interaction.options.getString("url");
		const videoData = await utils.ytSearch(videoURL);
		if (videoData !== null) {
			const embed = new Discord.MessageEmbed()
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
			utils.pm2.compInt();
			interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
		}
	}
};