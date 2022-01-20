const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:   { type: String, required: true },
	userID:    { type: String, required: true },
	response:  { type: Object, required: true },
	submitted: { type: Date,   required: true },
	status:    { type: String, required: true, default: "In review" }
});

const model = mongoose.model("ApplicationReplies", Schema);

module.exports = model;