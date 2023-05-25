/**
 * Database - HTTP - Route
 * Create - Post - Set
 * Read - Get - Get
 * Update - Put - Update
 * Delete - Delete -
 *
 *
 * Post
 * (Body, x-www-form-urlencoded)
 * key: text
 * value: goal-1
 *
 * Put
 * (Body, x-www-form-urlencoded)
 * key: text
 * value: goal-updated
 *
 */
const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error("User not found");
  // }

  // // Make sure the logged in user matches the goal user
  // if (goal.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not valid auhorized");
  // }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goal.deleteOne({ id: req.params.id });
  // await goal.findByIdAndRemove(req.params.id, function (err, docs) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Removed user: ", docs);
  //   }
  // });

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
