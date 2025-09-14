const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
  getUsernamesByAddresses
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Route start off with "/api/users"
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/usernames", getUsernamesByAddresses);

module.exports = router;
