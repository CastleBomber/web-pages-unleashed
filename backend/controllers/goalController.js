const getGoals = (req, res) => {
  res.status(200).json({ message: "x" });
};

const setGoal = (req, res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }
};

const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update ${req.params.id}` });
};

const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete ${req.params.id}` });
};

moudule.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
