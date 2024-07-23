const express = require("express");
const {
  addCourseController,
  assignLectureController,
  getAllCourseController,
} = require("../controllers/courseControllers");
const validateLectureHandler = require("../middlewares/validateLecture");

const courseRouter = express.Router();

courseRouter.post("/add-course", addCourseController);
courseRouter.post(
  "/assign-lecture",
  validateLectureHandler,
  assignLectureController
);
courseRouter.get("/courses", getAllCourseController);

module.exports = courseRouter;
