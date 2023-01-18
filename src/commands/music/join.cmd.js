const { SlashCommandBuilder } = require("discord.js");
const guildModel = require("../../models/guild.schema.js");
module.exports = {
	name: "join",
	description: "Make bot join voice channel",
	category: "music",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("join")
		.setDescription("Make bot join voice channel"),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, _voicePlayer, DJSVoice) => {
		const voiceChannel = interaction.member.voice.channel;
		const guild = interaction.member.guild;
		if (interaction.member.voice.channel !== null) {
			DJSVoice.joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: guild.id,
				adapterCreator: guild.voiceAdapterCreator,
			});
			try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: 0 }); } catch (err) { utils.log(err); }
			interaction.editReply({ content: `Joined ${ voiceChannel.name }`, ephemeral: true });
		} else {
			interaction.editReply({ content: "You must be in a voice channel to use this command", ephemeral: true });
		}
	}
};