
const { PermissionsBitField, SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const queueModel = require("../../models/queue.schema.js");
module.exports = {
	name: "test",
	description: "123",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [], // type: Array
	userPerms: [ PermissionsBitField.Flags.KickMembers ], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName('test')
		.setDescription('123'),

	execute: async (client, interaction, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		const guildRes = await queueModel.find({ guildID: interaction.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		console.log(guildRes.length);

		console.log(guildRes[3].songURL)

		interaction.editReply("test");
	}
};