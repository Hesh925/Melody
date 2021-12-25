/* eslint-disable */
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID: { type: String, required: true, unique: true},
	loggingChannel: { type: String },
	logging: { type: bool, required: true, default: false },

	// Moderation
	DeleteInvites: { type: bool, required: true, default: false },

	// logging
	messageUpdate: { type: bool, required: true, default: false },
	messageDelete: { type: bool, required: true, default: false },
	invitePosted:  { type: bool, required: true, default: false },
	
});

const model = mongoose.model("", Schema);

module.exports = model;