const task = require("../models/task");
const { ErrorHandler } = require("../middlewares/error.js");
// const task = require('../models/task');

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    User = await task.create({
      title,
      description,
      user: req.User,
    });

    res.status(201).json({
      success: true,
      message: "task added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const myTask = async (req, res, next) => {
  try {
    const userId = req.User._id;
    const alltasks = await task.find({ user: userId });

    res.status(201).json({
      success: true,
      alltasks,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Task = await task.findById(id);
    if (!Task) {
      return next(new ErrorHandler("Invalid ID", 404));
    }
    Task.iscompleted = !Task.iscompleted;
    await Task.save();

    res.status(201).json({
      success: true,
      message: "task updated!",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Task = await task.findById(id);

    if (!Task) {
      return next(new ErrorHandler("Invalid ID", 404));
    }
    await Task.deleteOne();

    res.status(201).json({
      success: true,
      message: "Task deleted!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask, myTask, updateTask, deleteTask };
