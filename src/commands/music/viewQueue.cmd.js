
const {SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const queueModel = require("../../models/queue.schema.js");
module.exports = {
	name: "viewqueue",
	description: "View the current song queue",
	category: "",
	userPerms: [], // type: Array https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "", // type: String

	slashData: new SlashCommandBuilder()
		.setName("viewqueue")
		.setDescription("View the current song queue"),

	execute: async (client, interaction) => {
		const res = await queueModel.find({ guildID: interaction.guildId }).limit(25).then((res) => { if(res) { return res; } else return null; });
		if(res.length > 0) {
			const embed = new EmbedBuilder()
				.setTitle("Current Queue")
				.setDescription(`**1: ${ res[0].songName }**\n${ res[0].songURL }`)
				.setColor(0x0099FF);
			for(let i = 1; i < res.length; i++) {
				embed.addFields({name: `**${ i + 1 }: ${ res[i].songName }**`, value: `${ res[i].songURL }`});
			}

			interaction.editReply({ embeds: [ embed ] });

		} else {
			interaction.editReply({ content: "There are no songs in the queue", ephemeral: true });
		}
	}
};