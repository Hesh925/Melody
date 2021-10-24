/* eslint-disable no-redeclare */
const Discord = require("discord.js");
const config = require("../config/CONFIG.json");
const ezcolor = require("djs-easy-color");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({intents});
const { OpusEncoder } = require("@discordjs/opus");
const DJSVoice = require("@discordjs/voice");
const utils = require("djs-utils");
const voicePlayer = DJSVoice.createAudioPlayer();
const opusEncoder = new OpusEncoder(48000, 2);

if (utils.searchArgv("env", true) === "dev") {
	var TOKEN = process.env.DISCORD_TOKEN_MELODY_DEV || utils.searchArgv("token", true);
} else { 
	var TOKEN = process.env.DISCORD_TOKEN_MELODY || utils.searchArgv("token", true);
}

const queueMap = [];
const nowPlaying = {};
const lastMessage = [];
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.playerEvents = new Discord.Collection();

[ "command_handler", "event_handler", "process_handler", "player_event_handler" ].forEach(handler => {
	require(`../handlers/${ handler }`)(client, Discord, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying, lastMessage);
	//require(`../handlers/${ handler }`)(client, Discord, config, ezcolor, utils, opusEncoder, voicePlayer, DJSVoice, queueMap, nowPlaying,);
});

if (utils.notNull(TOKEN)) {
	client.login(TOKEN);
} else {
	console.log("ERROR: No token provided");
	process.exit(1);
}
