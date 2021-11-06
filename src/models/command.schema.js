const mongoose = require("mongoose");

const CommandSchema = new mongoose.Schema({
	command:   { type: String, require: true, unique: true },
	category:  { type: String, require: false},
	timesUsed: { type: Number, require: false, default: 0 },
	slashUsed: { type: Number, require: false, default: 0 },
});

const model = mongoose.model("Commands", CommandSchema);

module.exports = model;