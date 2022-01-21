const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	userID:       { type: String,  require: true, unique: true },
	userName:     { type: String,  require: true },
	isBot:        { type: Boolean, require: true, default: false },
	isSystem:     { type: Boolean, require: true, default: false },
	commandsUsed: { type: Number,  require: true, default: 0 },
	warns:        { type: Number,  require: true, default: 0 },
});

const model = mongoose.model("Users", Schema);

module.exports = model;