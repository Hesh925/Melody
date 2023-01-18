
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:        { type: String,  required: true, unique: true },
	loggingChannel: { type: String },
	logging:        { type: Boolean, required: true, default: false },

	// Moderation
	DeleteInvites:  { type: Boolean, required: true, default: false },

	// logging
	messageUpdate:  { type: Boolean, required: true, default: false },
	messageDelete:  { type: Boolean, required: true, default: false },
	invitePosted:   { type: Boolean, required: true, default: false },
	
	
});

const model = mongoose.model("GuildSettings", Schema);

module.exports = model;