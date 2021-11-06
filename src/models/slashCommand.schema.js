const mongoose = require("mongoose");

const SlashCommandSchema = new mongoose.Schema({
	command:   { type: String, require: true, unique: true },
	category:  { type: String, require: false},
	timesused: { type: Number, require: false, default: 0 },
});

const model = mongoose.model("SlashCommands", SlashCommandSchema);

module.exports = model;