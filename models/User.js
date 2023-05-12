//Dependencies
const mongoose = require("mongoose");

//Schema
const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false },
});

//Exports
module.exports = mongoose.model("User", UserSchema);
