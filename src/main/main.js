/* eslint-disable  */
const Discord = require("discord.js");
const DJSVoice = require("@discordjs/voice");
const Opus = require("@discordjs/opus");
const colors = require("colors");
const utils = require("djs-utils");
const TOKEN = utils.searchArgv("env", true) === "dev" ? (process.env.DISCORD_TOKEN_MELODY_DEV || utils.searchArgv("token", true)) : process.env.DISCORD_TOKEN_MELODY || utils.searchArgv("token", true);

const mongoose = require("mongoose");

const client = new Discord.Client({
	autoReconnect: true,
	retryLimit: Infinity,
	fetchAllMembers: true,
	intents: new Discord.IntentsBitField(32767)
});
const voicePlayer = DJSVoice.createAudioPlayer({
	behaviors: {
		noSubscriber: DJSVoice.NoSubscriberBehavior.Pause,
		inlineVolume: true
	}
});

const opusEncoder = new Opus.OpusEncoder(128000, 2);
//if (utils.searchArgv("env", true) === "dev") {
//} else {
//	var TOKEN = process.env.DISCORD_TOKEN_MELODY || utils.searchArgv("token", true);
//}

// MONGODB LOGIN 
mongoose.connect(process.env.MONGO_DB_MELODY, {
	serverSelectionTimeoutMS: 50000
}).then(() => {
	utils.log("[DEBUG/MONGODB] Connected to MONGODB".green);
}).catch((err) => {
	utils.log(`[ERROR/MONGODB] ${ err }`); //process.exit(200); 
});

// Setup collections 
const nowPlaying = {};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.playerEvents = new Discord.Collection();

// Load in all event handlers
["event", "player_event", "process", "slash" ].forEach(handler => {
	require(`../handlers/${ handler }.handler.js`)(client, Discord, colors, opusEncoder, voicePlayer, DJSVoice, nowPlaying);
});


// DISCORD LOGIN
if (utils.notNull(TOKEN)) {
	client.login(TOKEN).then(() =>
		console.log("Logged in".green)
	);
} else {
	console.log("ERROR: No token provided".red);
	process.exit(1);
};