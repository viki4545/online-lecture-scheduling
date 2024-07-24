const express = require("express");
const instructorRouter = express.Router();

const {
  getAllInstructorController,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

instructorRouter.get(
  "/all-instructor",
  authMiddleware,
  getAllInstructorController
);

module.exports = instructorRouter;
