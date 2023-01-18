/* eslint-disable prefer-named-capture-group */
const ytsr = require("ytsr");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const queueModel = require("../../models/queue.schema.js");
const guildModel = require("../../models/guild.schema.js");

module.exports = {
	name: "queue",
	description: "Add song to queue",
	category: "music",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Add song to queue")
		.addStringOption(option => option.setName("song").setDescription("Title or URL for the song you want to add to the queue").setRequired(true)),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils) => {

		function sendEmbed(videoData) {
			const embed = new EmbedBuilder()
				.setTitle(String(videoData.title))
				.setURL(videoData.url)
				.setAuthor({ name: "Added Song to Queue:"})
				.setDescription(`**Title:** ${ videoData.title }
				**Length:** ${ videoData.duration === null ? "Probably a livestream" : videoData.duration }
				**Views:** ${ utils.numberWithCommas(videoData.views) }
				**Uploaded:** ${ videoData.uploadedAt }`)
				.setImage(videoData.bestThumbnail.url)
				.setColor("1049ed")
				.setTimestamp()
				.setFooter({ text: `Requested by: ${ interaction.user.username }`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true })});
			interaction.editReply({ embeds: [ embed ] });
		}

		const searchFor = interaction.options.getString("song");

		const queueRes = await queueModel.find({ guildID: interaction.guildId }).sort({queuePos: -1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
		const pos = queueRes !== null ? queueRes.queuePos + 1 : 1;
		async function saveQueue(videoData) {
			try {
				const guildSchema = await queueModel.create({
					userID:     interaction.user.id,
					guildID:    interaction.guildId,
					textCID:    interaction.channelId,
					songURL:    videoData.url,
					songName:   videoData.title,
					songLength: videoData.duration,
					queuePos:   pos
				});
				guildSchema.save().then(sendEmbed(videoData));
				await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { $inc: { songsInQueue: 1 }});
			} catch (err) {
				utils.log(err);
				interaction.editReply("An error has occurred while trying to queue your song please try again");
			}
		}
		const searchTerm = String(searchFor).replace(/,/g, " ");
		const filter = await ytsr.getFilters(searchTerm);
		const filter1 = filter.get("Type").get("Video");
		const resp = await ytsr(filter1.url, {limit: 1, pages : 1});
		const videoData = resp["items"][0];
		saveQueue(videoData);
	}
};