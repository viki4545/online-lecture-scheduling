const express = require("express");
const instructorRouter = express.Router();

const {
  getAllInstructorController,
} = require("../controllers/userControllers");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

// Get all instructors
instructorRouter.get(
  "/all-instructor",
  authMiddleware,
  getAllInstructorController
);

module.exports = instructorRouter;
