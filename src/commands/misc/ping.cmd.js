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
	allowSlash: true, 
	options: [ {"StringChoices": { name: "what_ping", description: "What Ping do you want to get?", required: true, choices: [ [ "Bot", "botping" ], [ "Discord Api", "api" ] ] }} ],
	run: async (_client, message, _args, Discord) => {
		const pping = new Discord.MessageEmbed().setAuthor("Pinging...").setColor("0x00FFFF");
		message.channel.send( {embeds: [ pping ] } ).then(msg => {
			const pingtime = msg.createdTimestamp - message.createdTimestamp;
			let color;

			if (pingtime < 200) {
				color = "#33FF57";
			}
			if (pingtime > 200) {
				// eslint-disable-next-line no-redeclare
				color = "#DBFF33";
			}
			if (pingtime > 300) {
				// eslint-disable-next-line no-redeclare
				color = "#FF5733";
			}

			const receivedEmbed = message.embeds[0];
			const ping = new Discord.MessageEmbed(receivedEmbed).setAuthor(`Bot ping is ${ pingtime }ms`).setColor(color);
			msg.delete();
			message.channel.send({ embeds: [ ping ] });
		});
	},

	slash: async (client, interaction) => {
		const StringOption = interaction.options.getString("what_ping");
		if(StringOption === "botping") { 
			await interaction.editReply({content: "Getting the Bot Ping...", ephemeral: true});
			interaction.editReply({content: `Bot Ping: \`${ Math.floor( Date.now() - interaction.createdTimestamp) } ms\``, ephemeral: true});
		} else {
		    interaction.editReply({content: `Api Ping: \`${ Math.floor(client.ws.ping) } ms\``, ephemeral: true});
		}
	}
};