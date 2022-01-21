/* eslint-disable*/
const guildModel = require("../../models/guild.schema.js");
module.exports = {
	name: "setdeftc",
	description: "sets the default text channel",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "owner",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: true, // type: Boolean
	botOwnerOnly: true, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: false, 
	options: [],
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		try {
			guildModel.findOneAndUpdate({ guildID: message.guildId }, { defaultTC: message.channelId }).then(message.channel.send("Set default text channel"));
		} catch(err) { utils.log(err); }
	},
	slash: async (client, interaction, args, Discord, _colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		interaction.editReply("Not set up yet").then( utils.pm2.compInt() );
	}
};