const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
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
    type: Object,
    required: true,
    unique: true,
  },
  word: {
    type: String,
    required: true,
  },
});

//MongoDB Collection named here - will give lowercase plural of name
module.exports = mongoose.model("File", FileSchema);
