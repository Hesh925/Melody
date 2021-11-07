/* eslint-disable prefer-named-capture-group, no-bitwise */
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
	allowSlash: true, 
	options: [ {"String": { name: "song", description: "title or URL for the song you want to play", required: true }} ],
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying, nextInQueue, interaction) => {
		const guildID = message ? message.guildId : nextInQueue.guildID;
		const textCID = message ? message.channel.id : nextInQueue.textCID;
		const searchFor = args ? args : nextInQueue.songURL;
		function sendEmbed(videoData) {
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
				.setTimestamp();
			if(interaction === null) client.guilds.cache.find(guild => guild.id === guildID).channels.cache.find(channel => channel.id === textCID).send({ embeds: [ embed ] });
			else if(interaction) interaction.editReply({ embeds: [ embed ]});
		}


		async function play() {
			const connection = await DJSVoice.getVoiceConnection(guildID); // Get connection
			connection.subscribe(voicePlayer); // Create subscription
			
			const searchTerm = String(searchFor).replace(/,/g, " ");
			if(searchTerm !== "" ) {
				const filter = await ytsr.getFilters(searchTerm);
				const filter1 = filter.get("Type").get("Video");
				const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
				
				if(resp !== null) {
					const videoData = resp["items"][0];
					nowPlaying["0"] = videoData;
					
					const resource = DJSVoice.createAudioResource(ytdl(videoData.url, { filter: "audioonly", quality: "highestaudio", highWaterMark: 1 << 25, }), {
						metadata: {
							title:   videoData.title,
							guildId: guildID,
							textCId: textCID
						}
					});
					voicePlayer.play(resource);
					sendEmbed(videoData);
				}
			} else {
				client.guilds.cache.find(guild => guild.id === guildID).channels.cache.find(channel => channel.id === textCID).send("You must provide a search term");
			}
		}
		
		if (message !== null) {
			message.suppressEmbeds(true);
			if (message.member.voice.channel !== null) {
				if(voicePlayer.state.status !== "playing") {
					client.commands.get("join").run(client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying); // Call join command 
					play();
				} else {
					client.guilds.cache.find(guild => guild.id === guildID).channels.cache.find(channel => channel.id === textCID).send("A song is already playing use the \"playnow\" or \"queue\" command");
				}
			} else {
				client.guilds.cache.find(guild => guild.id === guildID).channels.cache.find(channel => channel.id === textCID).send("You must be in a voice channel to use this command");
			}
		} else play();
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const guildID = interaction.guildId;
		const textCID = interaction.channelId;
		const searchFor = interaction.options.getString("song");
		function sendEmbed(videoData) {
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
				.setTimestamp();
			interaction.editReply({ embeds: [ embed ] });
		}
		async function play() {
			const connection = await DJSVoice.getVoiceConnection(guildID); // Get connection
			connection.subscribe(voicePlayer); // Create subscription
			
			const searchTerm = String(searchFor).replace(/,/g, " ");
			const filter = await ytsr.getFilters(searchTerm);
			const filter1 = filter.get("Type").get("Video");
			const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
			
			if(resp !== null) {
				const videoData = resp["items"][0];
				nowPlaying["0"] = videoData;
				
				const resource = DJSVoice.createAudioResource(ytdl(videoData.url, { filter: "audioonly", quality: "highestaudio" }), {
					metadata: {
						title:   videoData.title,
						guildId: guildID,
						textCId: textCID
					}
				});
				voicePlayer.play(resource);
				sendEmbed(videoData);
			}
		}

		if (interaction.member.voice.channel !== null) {
			if(voicePlayer.state.status !== "playing") {
				client.commands.get("join").slash(client, interaction, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying, false); // Call join command
				play();
			} else {
				interaction.editReply({ content: "A song is already playing use the \"playnow\" or \"queue\" command", ephemeral: true });
			}
		} else {
			interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true });
		}
			
	}
};