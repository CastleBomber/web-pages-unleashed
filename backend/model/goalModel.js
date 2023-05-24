const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
  type: String,
  required: [true, "Please add a text value"],
  timestamps: true,
});
