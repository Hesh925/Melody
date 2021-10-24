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
	// eslint-disable-next-line no-unused-vars
	async execute(_client, message, args, Discord, _config, _ezcolor, utils, _opusEncoder, _voicePlayer, _DJSVoice, _queueMap, _nowPlaying, lastMessage) {
		lastMessage[0] = message;
		message.suppressEmbeds(true);
		if (args !== []) {
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
	}
};