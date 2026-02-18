const User = require("../models/User");
const Task = require("../models/Task");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all tasks (admin view)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email");

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
