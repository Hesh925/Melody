const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:          { type: String, required: true },
	userID:           { type: String, required: true },
	warnedBy:         { type: String, required: true, default: "Unknown" },
	reason:           { type: String },
	warnNumber:       { type: Number, required: true, default: 0},
	globalWarnNumber: { type: Number, required: true, default: 0}
});

const model = mongoose.model("warning", Schema);

module.exports = model;
