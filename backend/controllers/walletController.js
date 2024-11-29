const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Get user by wallet address
// @route   GET /api/wallets/address/:address
// @access  Public
const getUserByWalletAddress = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    walletAddress: new RegExp(`^${req.params.address}$`, "i"), // Case-insensitive regex
  });

  if (user) {
    res.json({ name: user.name, walletAddress: user.walletAddress });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = { getUserByWalletAddress}