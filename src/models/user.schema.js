const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	userID:       { type: String, require: true, unique: true },
	userName:     { type: String, require: true },
	commandsUsed: { type: Number, require: true, default: 0 },
});

const model = mongoose.model("Users", Schema);

module.exports = model;