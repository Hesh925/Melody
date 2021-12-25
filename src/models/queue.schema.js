const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	userID:     { type: String, require: true },
	guildID:    { type: String, require: true },
	textCID:    { type: String, require: true },
	songURL:    { type: String, require: true },
	songName:   { type: String, require: true },
	songLength: { type: String, require: true },
	reqBy:      { type: String, require: true },
	queuePos:   { type: Number, require: true }
});
const model = mongoose.model("Queue", Schema);

module.exports = model;