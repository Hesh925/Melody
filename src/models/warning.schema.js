const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:          { type: String, required: true },
	userID:           { type: String, required: true },
	warnID:           { type: String, required: true },
	date:             { type: Date,   required: true },
	warnedBy:         { type: String, required: true, default: "Unknown" },
	reason:           { type: String, required: true, default: "No reason provided"}
});

const model = mongoose.model("warning", Schema);

module.exports = model;
