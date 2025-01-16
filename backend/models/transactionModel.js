const mongoose = require("mongoose");
const { StringDecoder } = require("node:string_decoder");

const transactionSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, lowercase: true },
  recipient: { type: String, required: true, lowercase:true },
  amount: { type: String, required: true },
  transactionHash: { type: String, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
