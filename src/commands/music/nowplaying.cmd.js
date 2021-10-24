/* eslint-disable prefer-named-capture-group */
function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}
module.exports = {
	name: "nowplaying",
	description: "",
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
	async execute(_client, message, _args, Discord, _config, _ezcolor, _utils, _opusEncoder, _voicePlayer, _DJSVoice, _queueMap, nowPlaying, lastMessage) {
		lastMessage[0] = message;
		const videoData = nowPlaying["0"];
		if (videoData !== null) {
			const embed = new Discord.MessageEmbed()
				.setTitle(String(videoData.title))
				.setURL(videoData.url)
				.setAuthor("Now Playing:")
				.setDescription(`**Title:** ${ videoData.title }
						**Length:** ${ videoData.duration === null ? "Probably a livestream" : videoData.duration }
						**Views:** ${ numberWithCommas(videoData.views) }
						**Uploaded:** ${ videoData.uploadedAt }`)
				.setImage(videoData.bestThumbnail.url)
				.setColor("1049ed")
				.setFooter(`Requested by: ${ message.author.username }`,  message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp();
			message.channel.send({ embeds: [ embed ] });
		}
	}
};