const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	userID:       { type: String, require: true, unique: true },
	commandsUsed: { type: Number, require: true, default: 0 },
});

const model = mongoose.model("Users", UserSchema);

module.exports = model;