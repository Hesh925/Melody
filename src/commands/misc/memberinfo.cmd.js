const { SlashCommandBuilder } = require("discord.js");
module.exports = {
	name: "memberinfo",
	description: "Get info about all members",
	usage: "<> is strict & [] is optional",
	args: {},
	category: "misc",
	aliases: [], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	allowSlash: true, 
	options: [],
	// eslint-disable-next-line no-unused-vars
	run: async (client, message, args, Discord, colors, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, nowPlaying) => {
		var membersTotal   = [];
		var membersOnline  = [];
		var membersOffline = [];
		var membersIdle    = [];
		var membersDnd     = [];
		client.guilds.cache.forEach(guild => {
			guild.members.cache.forEach(member => {
				membersTotal.push(member.user.username);
				if(member.presence !== null){
					if(member.presence.status === "online") {
						membersOnline.push(member.user.username);
					}
					if(member.presence.status === "idle") {
						membersIdle.push(member.user.username);
					}
					if(member.presence.status === "dnd") {
						membersDnd.push(member.user.username);
					}
				} else {
					membersOffline.push(member.user.username);
				}
			});
		});
		var membersTotalSorted   = utils.removeDuplicates(membersTotal);
		var membersOnlineSorted  = utils.removeDuplicates(membersOnline);
		var membersOfflineSorted = utils.removeDuplicates(membersOffline);
		var membersIdleSorted    = utils.removeDuplicates(membersIdle);
		var membersDndSorted     = utils.removeDuplicates(membersDnd);
		console.log(`Members total:   ${ membersTotalSorted.length }`);
		console.log(`Members online:  ${ membersOnlineSorted.length }`);
		console.log(`Members offline: ${ membersOfflineSorted.length }`);
		console.log(`Members idle:    ${ membersIdleSorted.length }`);
		console.log(`Members dnd:     ${ membersDndSorted.length }`);
		const embed = new Discord.MessageEmbed()
			.setTitle("Member Info")
			.setDescription(
				`**Members total:**   ${ membersTotalSorted.length + 1 }
				**Members online:**  ${ membersOnlineSorted.length }
				**Members offline:** ${ membersOfflineSorted.length }
				**Members idle:**    ${ membersIdleSorted.length }
				**Members dnd:**     ${ membersDndSorted.length }`)
			.setColor("1049ed")
			.setTimestamp();
		message.channel.send({ embeds: [ embed ] });
	},

	slash: async (client, interaction, args, Discord, colors, config, ezcolor, utils) => {
		var membersTotal   = [];
		var membersOnline  = [];
		var membersOffline = [];
		var membersIdle    = [];
		var membersDnd     = [];
		client.guilds.cache.forEach(guild => {
			guild.members.cache.forEach(member => {
				membersTotal.push(member.user.username);
				if(member.presence !== null){
					if(member.presence.status === "online") {
						membersOnline.push(member.user.username);
					}
					if(member.presence.status === "idle") {
						membersIdle.push(member.user.username);
					}
					if(member.presence.status === "dnd") {
						membersDnd.push(member.user.username);
					}
				} else {
					membersOffline.push(member.user.username);
				}
			});
		});
		var membersTotalSorted   = utils.removeDuplicates(membersTotal);
		var membersOnlineSorted  = utils.removeDuplicates(membersOnline);
		var membersOfflineSorted = utils.removeDuplicates(membersOffline);
		var membersIdleSorted    = utils.removeDuplicates(membersIdle);
		var membersDndSorted     = utils.removeDuplicates(membersDnd);

		const embed = new Discord.MessageEmbed()
			.setTitle("Member Info")
			.addFields([
				{
					"name": "Members",
					"value": 
					   `**Members total:**   ${ membersTotalSorted.length + 1 }
						**Members online:**  ${ membersOnlineSorted.length }
						**Members offline:** ${ membersOfflineSorted.length }
						**Members idle:**    ${ membersIdleSorted.length }
						**Members dnd:**     ${ membersDndSorted.length }`
				}
			])
			.setColor("1049ed")
			.setTimestamp();
		interaction.editReply({ embeds: [ embed ] }).then( utils.pm2.compInt() );
	}
};