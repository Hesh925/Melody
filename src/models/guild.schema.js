const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
	guildID:      { type: String,  require: true,  unique: true},
	playing:      { type: Boolean, require: true,  default: false},
	loop:         { type: Boolean, require: true,  default: false},
	sentEmbed:    { type: Boolean, require: true,  default: true},
	volume:       { type: Number,  require: true,  default: 1 },
	defaultTC:    { type: String,  require: true,  default: 0 },
	songsInQueue: { type: Number,  require: true,  default: 0 }
});

const model = mongoose.model("Guilds", GuildSchema);

module.exports = model;