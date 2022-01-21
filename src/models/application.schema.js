const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	guildID:         { type: String, required: true },
	applicationID:   { type: String, required: true, unique: true},
	applicationName: { type: String, required: true },
	questions:       { type: Object, required: true }
});

const model = mongoose.model("Application", Schema);

module.exports = model;