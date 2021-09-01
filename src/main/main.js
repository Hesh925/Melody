const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents});
const { OpusEncoder } = require("@discordjs/opus");
const DJSVoice = require("@discordjs/voice");

const voicePlayer = DJSVoice.createAudioPlayer();
const opusEncoder = new OpusEncoder(48000, 2);

var TOKEN = process.env.DISCORD_TOKEN_MELODY || (process.argv[3]).slice(1);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

[ "command_handler", "event_handler", "process_handler" ].forEach(handler => {
	require(`../handlers/${ handler }`)(client, Discord, opusEncoder, voicePlayer, DJSVoice);
});

client.login(TOKEN);
