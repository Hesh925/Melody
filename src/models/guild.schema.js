const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:      { type: String,  require: true,  unique: true},
	guildName:    { type: String,  require: true },
	playing:      { type: Boolean, require: true,  default: false},
	loop:         { type: Boolean, require: true,  default: false},
	volume:       { type: Number,  require: true,  default: 1 },
	defaultTC:    { type: String,  require: true,  default: 0 },
	songsInQueue: { type: Number,  require: true,  default: 0 }
});

const model = mongoose.model("Guilds", Schema);

module.exports = model;