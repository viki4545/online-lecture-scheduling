const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// Add instructor
const addInstructorController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const instructor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "instructor",
    });
    if (instructor) {
      res.status(200).json({
        message: "instructor created sucessfully!",
        error: [],
        data: instructor,
      });
    } else {
      res.status(400).json({
        message: "Failed to create instructor",
        error: [],
        data: {},
      });
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
};

// Get all instructors
const getAllInstructorController = async (req, res, next) => {
  try {
    const instructors = await User.find({ role: "instructor" });
    if (instructors) {
      res.status(200).json({
        message: "All instructor fetched sucessfully!",
        error: [],
        data: instructors,
      });
    } else {
      res.status(400).json({
        message: "Failed to fetched instructor data",
        error: [],
        data: {},
      });
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
};

module.exports = { addInstructorController, getAllInstructorController };
