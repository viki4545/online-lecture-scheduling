const Course = require("../models/courseModel.js");

// add a new course
const addCourseController = async (req, res, next) => {
  try {
    const { name, level, description, image } = req.body;
    const course = await Course.create({ name, level, description, image });
    if (course) {
      res.status(201).json({
        message: "Course added successfully!",
        error: [],
        data: course,
      });
    } else {
      res.status(400).json({
        message: "Failed to add course",
        error: error,
        data: {},
      });
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
};

// assign lecture to the instructor
const assignLectureController = async (req, res, next) => {
  try {
    const { courseId, instructorId, date } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          lectures: {
            instructor: instructorId,
            date: new Date(date),
          },
        },
      },
      { new: true }
    );
    if (updatedCourse) {
      res.status(201).json({
        message: "Lecture assigned to the instructor!",
        error: [],
      });
    } else {
      res.status(400).json({
        message: "Failed to assigned the lecture to the instructor",
        error: error,
      });
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
};

// get all courses
const getAllCourseController = async (req, res, next) => {
  try {
    const course = await Course.find().populate("lectures.instructor");
    if (course) {
      res.status(201).json({
        message: "All courses fetched successfully!",
        error: [],
        data: course,
      });
    } else {
      res.status(400).json({
        message: "Failed to fetch courses",
        error: error,
        data: [],
      });
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
};

module.exports = {
  addCourseController,
  assignLectureController,
  getAllCourseController,
};
