const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
	userID:   { type: String, require: true },
	guildID:  { type: String, require: true },
	textCID:  { type: String, require: true },
	songURL:  { type: String, require: true },
	songName: { type: String, require: true },
	reqBy:    { type: String, require: true },
	queuePos: { type: Number, require: true }
});
const model = mongoose.model("Queue", QueueSchema);

module.exports = model;