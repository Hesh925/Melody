module.exports = {
	name: "ping",
	description: "This is a ping command",
	usage: "",
	args: {},
	category: "misc",
	aliases: [ "pong" ], // type: Array
	userPerms: [], // type: Array
	ownerOnly: false, // type: Boolean
	botOwnerOnly: false, // type: Boolean
	nsfw: false, // type: Boolean
	disabled: false, // type: Boolean
	disabledReason: "",
	async execute(_client, message, _args, Discord) {
		const pping = new Discord.MessageEmbed().setAuthor("Pinging...").setColor("0x00FFFF");
		message.channel.send( {embeds: [ pping ] } ).then(msg => {
			const pingtime = msg.createdTimestamp - message.createdTimestamp;
			if (pingtime < 200) {
				var color = "#33FF57";
			}
			if (pingtime > 200) {
				// eslint-disable-next-line no-redeclare
				var color = "#DBFF33";
			}
			if (pingtime > 300) {
				// eslint-disable-next-line no-redeclare
				var color = "#FF5733";
			}

			const receivedEmbed = message.embeds[0];
			const ping = new Discord.MessageEmbed(receivedEmbed).setAuthor(`Bot ping is ${ pingtime }ms`).setColor(color);
			msg.delete();
			message.channel.send({ embeds: [ ping ] });
		});
	}
};