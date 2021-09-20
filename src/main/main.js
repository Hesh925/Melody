/* eslint-disable no-redeclare */
const args = process.argv.slice(2);
const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents});
const { OpusEncoder } = require("@discordjs/opus");
const DJSVoice = require("@discordjs/voice");

const voicePlayer = DJSVoice.createAudioPlayer();
const opusEncoder = new OpusEncoder(48000, 2);
if (args[0] === "-dev") {
	var TOKEN = process.env.DISCORD_TOKEN_MELODY_DEV;
} else{ 
	var TOKEN = process.env.DISCORD_TOKEN_MELODY || (args[2]).slice(1);
}
const queueArray = new Map;
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

[ "command_handler", "event_handler", "process_handler" ].forEach(handler => {
	require(`../handlers/${ handler }`)(client, Discord, opusEncoder, voicePlayer, DJSVoice, queueArray);
});
client.login(TOKEN);
