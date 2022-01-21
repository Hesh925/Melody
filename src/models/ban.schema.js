const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	userID:  { type: String, required: true, unique: true },
	guildID: { type: String, required: true },
	expires: { type: Date,   required: true }
});

const model = mongoose.model("Bans", Schema);

module.exports = model;