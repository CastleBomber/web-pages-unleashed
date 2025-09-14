/**
 * Database - HTTP - Route
 * Create - Post - Set
 * Read - Get - Get
 * Update - Put - Update
 * Delete - Delete - Delete
 *
 * [Postman User Requests]
 * Post: http://localhost:5000/api/users/
 * Body, x-www-form-urlencoded
 * name: CastleBomber
 * email: a@b.com
 * password: hack123
 *
 * Post: http://localhost:5000/api/users/login
 * Body, x-www-form-urlencoded
 * email: a@b.com
 * password: hack123
 *
 * Get: http://localhost:5000/api/users/me
 * Authorization: Bearer Token
 * Token: ""
 *
 *
 */

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, walletAddress, password } = req.body;

  if (!name || !email || !walletAddress || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({ name, email, walletAddress, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Get usernames by wallet addresses
// @route   POST /api/users/usernames
// @access  Public 
const getUsernamesByAddresses = asyncHandler(async (req, res) => {
  try {
    const { addresses } = req.body;
    
    if (!addresses || !Array.isArray(addresses)) {
      res.status(400);
      throw new Error("Addresses array is required");
    }

    // Convert all addresses to lowercase for case-insensitive matching
    const lowercaseAddresses = addresses.map(addr => addr.toLowerCase());
    
    // Query your database for users with these addresses
    const users = await User.find({ 
      walletAddress: { 
        $in: lowercaseAddresses.map(addr => RegExp(`^${addr}$`, 'i'))
      } 
    }).select('walletAddress name');
    
    // Create a mapping of address to username
    const userMap = {};
    users.forEach(user => {
      userMap[user.walletAddress.toLowerCase()] = user.name;
    });
    
    res.json(userMap);
  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = { registerUser, loginUser, getMe, getUsernamesByAddresses };
