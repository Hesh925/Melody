const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	userID:  { type: String, required: true, unique: true },
	guildID: { type: String, required: true },
	expires: { type: Date }
});

const model = mongoose.model("", Schema);

module.exports = model;