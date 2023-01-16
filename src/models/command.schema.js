const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	command:   { type: String, require: true, unique: true },
	category:  { type: String, require: false},
	timesUsed: { type: Number, require: false, default: 0 },
});

const model = mongoose.model("Commands", Schema);

module.exports = model;