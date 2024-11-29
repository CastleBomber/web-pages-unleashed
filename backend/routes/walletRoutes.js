const express = require("express");
const router = express.Router();
const { getUserByWalletAddress } = require("../controllers/walletController");

// @route   GET /api/wallets/address/:address
router.get("/address/:address", getUserByWalletAddress);

module.exports = router;
