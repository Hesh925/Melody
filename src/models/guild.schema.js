const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
	guildID: { type: String, require: true, unique: true},
	playing: { type: Boolean, require: true, default: false},
	songsInQueue: { type: Number, require: true, default: 0 }
});

const model = mongoose.model("Guilds", GuildSchema);

module.exports = model;