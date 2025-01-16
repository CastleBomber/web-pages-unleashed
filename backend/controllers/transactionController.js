const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transactionModel");

// @desc    Log a transaction
// @route   POST /api/transactions
// @access  Public
const createTransaction = asyncHandler(async (req, res) => {
  const { recipient, amount, status, transactionHash, walletAddress } =
    req.body;

  if (!recipient || !amount || !walletAddress || !transactionHash || !status) {
    res.status(400);
    throw new Error("Please include all required fields");
  }

  console.log("transactionController.js createTransaction(), Data to save:", req.body);

  const transaction = await Transaction.create({
    recipient,
    amount,
    status,
    transactionHash,
    walletAddress,
  });

  console.log("Saved transaction:", transaction);

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
