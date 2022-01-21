const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:          { type: String, required: true },
	userID:           { type: String, required: true },
	date:             { type: Date,   required: true },
	warnedBy:         { type: String, required: true, default: "Unknown" },
	reason:           { type: String }
});

const model = mongoose.model("warning", Schema);

module.exports = model;
