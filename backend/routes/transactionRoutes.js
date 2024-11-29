const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactionModel");
const { createTransaction, getTransactions } = require("../controllers/transactionController");

// Routes begin with "/api/transactions"
// POST - Create a new transaction
router.post("/", createTransaction);  

// GET - fetch transactions by wallet address
router.get("/", getTransactions);

module.exports = router;