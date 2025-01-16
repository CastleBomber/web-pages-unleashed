const mongoose = require("mongoose");
const { StringDecoder } = require("node:string_decoder");

const transactionSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: String, required: true },
    transactionHash: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
