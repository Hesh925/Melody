const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
	songName: {type: String}
});

const model = mongoose.model("Songs", SongSchema);

module.exports = model;