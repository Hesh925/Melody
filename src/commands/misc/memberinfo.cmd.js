const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
	name: "memberinfo",
	description: "Get info about all members",
	category: "misc",
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",

	slashData: new SlashCommandBuilder()
		.setName("memberinfo")
		.setDescription("Get info about all members"),
		
	// eslint-disable-next-line no-unused-vars

	execute: async (client, interaction, Discord, colors, config, ezcolor, utils) => {
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

		const embed = new EmbedBuilder()
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
		interaction.editReply({ embeds: [ embed ] });
	}
};