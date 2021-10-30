/* eslint-disable prefer-named-capture-group */
const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
function numberWithCommas(x) {
	var parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

module.exports = {
	name: "play",
	description: "play a track in the current voice",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "music",
	aliases: [ "p" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, _queueMap, nowPlaying) {
		message.suppressEmbeds(true);
		if (message.member.voice.channel !== null) {
			if(voicePlayer.state.status !== "playing") {
				client.commands.get("join").execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice); // Call join command 
				const connection = await DJSVoice.getVoiceConnection(message.guild.id); // Get connection
				connection.subscribe(voicePlayer); // Create subscription

				const searchTerm = String(args).replace(/,/g, " ");
				if(searchTerm !== "" ) {
					const filter = await ytsr.getFilters(searchTerm);
					const filter1 = filter.get("Type").get("Video");
					const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
				
					if(resp !== null) {
						const videoData = resp["items"][0];
						nowPlaying["0"] = videoData;
				
						const resource = DJSVoice.createAudioResource(ytdl(videoData.url, { filter: "audioonly", quality: "highestaudio" }), {
							metadata: {
								title:   videoData.title,
								guildId: message.guildId,
								tcId:    message.channel.id
							}
						});
						voicePlayer.play(resource);
						try {
							await DJSVoice.entersState(voicePlayer, DJSVoice.AudioPlayerStatus.Playing);
						
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
						
							// Console.log("Playback has started!");
						} catch (error) {
							message.channel.send("An error has occurred");
							console.error(error);
						}
					}
				} else {
					message.channel.send("You must provide a search term");
				}

			} else {
				message.channel.send("A song is already playing use the \"playnow\" command");
				// Add to queue
			}

		} else {
			message.channel.send("You must be in a voice channel to use this command");
		}
	}
};