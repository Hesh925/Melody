const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
	guildID:     { type: String, require: true },
	channelID:   { type: String, require: true },
	channelType: { type: String, require: true }
});

const model = mongoose.model("Channels", ChannelSchema);

module.exports = model;