const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true },
    recipient: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
