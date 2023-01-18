const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const queueModel = require("../../models/queue.schema.js");
const guildModel = require("../../models/guild.schema.js");
const ytsr = require("ytsr");
const ytdl = require("ytdl-core");
module.exports = {
	name: "skip",
	description: "Skip the song that is playing",
	usage: "",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: true, // type: Boolean
	disabledReason: "Broken",

	slashData: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skip the song that is currently playing"),

	execute: async (client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if (voiceChannel.id === connection.joinConfig.channelId) {
			if (voicePlayer.state.status === "playing") {

				await queueModel.findOneAndDelete({ guildID: interaction.guildId }).sort({queuePos: 1}).limit(1);
				await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { $inc: { songsInQueue: -1 }});
				const res = await queueModel.find({ guildID: interaction.guildId }).sort({queuePos: 1}).limit(1).then(( [ res ] ) => { if(res) { return res; } else return null; });
				if(res !== null ) {
					await voicePlayer.pause();
					utils.play(client, EmbedBuilder, DJSVoice, voicePlayer, interaction.guildId, interaction.channelId, res.songURL, nowPlaying, utils, ytsr, ytdl, null);

				} else await interaction.editReply({ content: "The queue is empty"});
			} else await interaction.editReply({ content: "Nothing is playing to skip", ephemeral: true});
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true});
	}
};
