const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Add instructor
const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "instructor",
    });

    if (user) {
      const token = generateToken(user._id, user.role);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    next(error);
  }
};

// login user
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id, user.role);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
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
    next(error);
  }
};

module.exports = {
  registerUserController,
  getAllInstructorController,
  loginUserController,
  logoutController,
};
