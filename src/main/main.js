/* eslint-disable no-redeclare */
const Discord = require("discord.js");
const DJSVoice = require("@discordjs/voice");
const colors = require("colors");
const Opus = require("@discordjs/opus");
const utils = require("djs-utils");
const mongoose = require("mongoose");

// console.clear();
console.log("TODO: remake all commands with slash capability");
console.log("TODO: make slash handler");

const client = new Discord.Client({
	autoReconnect: true,
	retryLimit: Infinity,
	fetchAllMembers: false,
	intents: new Discord.Intents(32767)
});

const voicePlayer = DJSVoice.createAudioPlayer({ behaviors: { noSubscriber: DJSVoice.NoSubscriberBehavior.Pause } });
const opusEncoder = new Opus.OpusEncoder(48000, 2);

if (utils.searchArgv("env", true) === "dev") {
	var TOKEN = process.env.DISCORD_TOKEN_MELODY_DEV || utils.searchArgv("token", true);
} else { 
	var TOKEN = process.env.DISCORD_TOKEN_MELODY || utils.searchArgv("token", true);
}

// Setup collections 
const nowPlaying = {};
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();
client.playerEvents = new Discord.Collection();

// Load in all event handlers
[ "command_handler", "event_handler", "player_event_handler", "process_handler", "slash_handler" ].forEach(handler => {
	require(`../handlers/${ handler }`)(client, Discord, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
});

// MONGODB LOGIN 
mongoose.connect(process.env.MONGO_DB_MELODY, {
	serverSelectionTimeoutMS: 5000
}).then(() => {
	utils.log("[DEBUG/MONGODB] Connected to MONGODB");
}).catch((err) => { 
	utils.log(`[ERROR/MONGODB] ${ err }`); process.exit(200); 
});

// DISCORD LOGIN
if (utils.notNull(TOKEN)) {
	client.login(TOKEN);
} else {
	console.log("ERROR: No token provided".red);
	process.exit(1);
}