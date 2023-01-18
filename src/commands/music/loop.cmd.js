const guildModel = require("../../models/guild.schema.js");
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "loop",
	description: "Turn on loop mode",
	category: "music",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("loop")
		.setDescription("Turn on loop mode")
		.addStringOption(option => option.setName("mode").setDescription("Loop mode").setRequired(true).addChoices({ name: "Off", value: "off" }, { name: "Song", value: "song" }, { name: "Queue", value: "queue" })),

	execute: async (_client, interaction, _Discord, _colors, _config, _ezcolor, utils, _opusEncoder, voicePlayer, DJSVoice) => {
		const guildRes = await guildModel.findOne({ guildID: interaction.guildId }).then(( res ) => { if(res) { return res; } else return null; });
		const connection = DJSVoice.getVoiceConnection(interaction.guildId); // Get connection
		const voiceChannel = interaction.member.voice.channel;
		const loopMode = interaction.options.getString("mode");
		if (!connection) return interaction.editReply({ content: "I must be in a voice channel to use this command", ephemeral: true });
		if (voiceChannel.id === connection.joinConfig.channelId) {

			if (voicePlayer.state.status === "playing") { // 0 = off, 1 = song, 2 = queue

				if (loopMode === "off") {
					if (guildRes.loop === 0) return interaction.editReply({ content: "Loop is already off", ephemeral: true });
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: 0 }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop off");
				} else if( loopMode === "song"){
					if (guildRes.loop === 1) return interaction.editReply({ content: "Loop is already on song", ephemeral: true });
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: 1 }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop Song");
				} else {
					if (guildRes.loop === 2) return interaction.editReply({ content: "Loop is already on queue", ephemeral: true });
					try { await guildModel.findOneAndUpdate({ guildID: interaction.guildId }, { loop: 2 }); } catch (err) { utils.log(err); }
					await interaction.editReply("Loop queue");
				}

			} else await interaction.editReply({ content: "Nothing is playing to loop", ephemeral: true});
		} else await interaction.editReply({ content: "Must be in the same channel as the bot to use this command", ephemeral: true});
	}
};
