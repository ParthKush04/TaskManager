const Task = require("../models/Task");


// CREATE
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};


// GET ALL (only user's tasks)
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });
  res.status(200).json(tasks);
};


// UPDATE
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  if (
    task.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  )
    return res.status(403).json({ message: "Not authorized" });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  await task.save();

  res.status(200).json(task);
};


// DELETE
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ message: "Task not found" });

  if (
    task.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  )
    return res.status(403).json({ message: "Not authorized" });

  await task.deleteOne();

  res.status(200).json({ message: "Task deleted" });
};
