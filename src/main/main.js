const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents});

var TOKEN = process.env.DISCORD_TOKEN_MUSIC || new TypeError("No Token");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

[ "command_handler", "event_handler", "process_handler" ].forEach(handler => {
	require(`../handlers/${ handler }`)(client, Discord);
});

client.login(TOKEN);