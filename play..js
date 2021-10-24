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
	async execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage, state) {
		if (message.channel) lastMessage[0] = message.channel.id;
		console.log(lastMessage[0]);
		const LMCHID = lastMessage[0];
		// Console.log(message);
		async function play(searchTerm, bool) {
			if(searchTerm !== "" ) {
				const filter = await ytsr.getFilters(searchTerm);
				const filter1 = filter.get("Type").get("Video");
				const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
				
				if(resp !== null) {
					const videoData = resp["items"][0];
					nowPlaying["0"] = videoData;
					if (bool) queueMap.shift(); // Clear index 0 from array
					const resource = DJSVoice.createAudioResource(ytdl(videoData.url, { filter: "audioonly", quality: "highestaudio" }));
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
							.setFooter(`Requested by: ${ args === null ? "queue" : message.author.username }`) // ,  message.author.displayAvatarURL({ dynamic: true })
							.setTimestamp();
						client.channels.cache.find(channel => channel.id === LMCHID).send({ embeds: [ embed ] });
						utils.musicLog(videoData.title);
						
					} catch (error) {
						console.error(error);
						client.channels.cache.find(channel => channel.id === LMCHID).send("An error has occurred");
					}
				}
			} else {
				client.channels.cache.find(channel => channel.id === LMCHID).send("You must provide a search term");
			}
		}
		
		if (!state) {
			if (message.member.voice.channel !== null) {
				if(voicePlayer.state.status !== "playing") {
					client.commands.get("join").execute(client, message, args, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage); // Call join command 
					const connection = await DJSVoice.getVoiceConnection(message.guild.id);
					connection.subscribe(voicePlayer); // Create subscription
					const searchTerm = String(args).replace(/,/g, " ");
					play(searchTerm, false);
				 } else { 
					 client.channels.cache.find(channel => channel.id === LMCHID).send("A song is already playing use the \"playnow\" command or react with () to add to queue");
					 // Add to queue
				}
			} else {
				client.channels.cache.find(channel => channel.id === LMCHID).send("You must be in a voice channel to use this command");
			}
		} else {
			if (state === "queue") {
				console.log(message.channel.id);
				if (queueMap.length !== 0) {
					play(queueMap[0], true);
				}
			}
			if (state === "pn") {
				voicePlayer.stop();
				const searchTerm = String(args).replace(/,/g, " ");
				play(searchTerm);
			}
		}
	}
};