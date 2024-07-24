const express = require("express");
const {
  addCourseController,
  assignLectureController,
  getAllCourseController,
  getLecturesByInstructorId,
} = require("../controllers/courseControllers");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const courseRouter = express.Router();

courseRouter.post("/add-course", authMiddleware, isAdmin, addCourseController);
courseRouter.post(
  "/assign-lecture",
  authMiddleware,
  isAdmin,
  assignLectureController
);
courseRouter.get(
  "/all-courses",
  authMiddleware,
  isAdmin,
  getAllCourseController
);

courseRouter.get(
  "/lectures/:instructorId",
  authMiddleware,
  getLecturesByInstructorId
);

module.exports = courseRouter;
