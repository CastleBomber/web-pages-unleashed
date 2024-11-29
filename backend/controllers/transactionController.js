const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

// Create a new transaction, handles the POST request
const createTransaction = asyncHandler(async (req, res) => {
  const { recipient, amount, status, transactionHash, walletAddress } =
    req.body;

  if (!recipient || !amount || !walletAddress) {
    res.status(400);
    throw new Error("Please include all required fields");
  }

  const transaction = await Transaction.create({
    recipient,
    amount,
    status,
    transactionHash,
    walletAddress,
  });

  res.status(201).json(transaction);
});

const getTransactions = asyncHandler(async (req, res) => {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    res.status(400);
    throw new Error("Wallet address is required");
  }

  const transactions = await Transaction.find({ walletAddress });
  res.status(200).json(transactions);
});

module.exports = { createTransaction, getTransactions };
