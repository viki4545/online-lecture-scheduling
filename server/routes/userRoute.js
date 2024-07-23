const express = require("express");
const {
  addInstructorController,
  getAllInstructorController,
} = require("../controllers/userControllers");

const userRouter = express.Router();

userRouter.post("/add-instructor", addInstructorController);
userRouter.get("/instructors", getAllInstructorController);

module.exports = userRouter;
