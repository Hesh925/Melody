const guildModel = require("../../models/guild.schema.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "loop",
	description: "Turn on loop mode",
	usage: "",
	args: {},
	category: "music",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("loop")
		.setDescription("Turn on loop mode"),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const guildRes = await guildModel.findOne({ guildID: interaction.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		if (voiceChannel.id === connection.joinConfig.channelId) {

			if (voicePlayer.state.status === "playing") {

				if (guildRes.loop) {
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: false }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop set false");
				} else {
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: true }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop set true");
				}
			} else await interaction.editReply({ content: "Nothing is playing to loop", ephemeral: true});
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true});
	}
};