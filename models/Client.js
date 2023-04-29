//Dependencies
const mongoose = require("mongoose");

//Schema
const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  word: {
    type: String,
    required: true,
  },
});

//Exports
//The MongoDB collection named here - will give lowercase plural of name in collection
module.exports = mongoose.model("Client", ClientSchema);
