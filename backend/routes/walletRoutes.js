const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// @desc    Get user by wallet address
// @route   GET /api/wallets/address/:address
// @access  Public
router.get("/address/:address", async (req, res) => {
  try {
    const { address } = req.params;
    //const user = await User.findOne({ walletAddress: address });

    const user = await User.findOne({
      walletAddress: new RegExp(`^${req.params.address}$`, "i"), // Case-insensitive regex
    });

    if (user) {
      //return res.json({ name: user.name }); // Return user's name
      return res.json({ user }); // Return user's name
    } else {
      return res.status(404).json({ message: "User not found" }); // Return Guest User fallback
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
