const Course = require("../models/courseModel.js");
const mongoose = require("mongoose");
// add a new course
const addCourseController = async (req, res, next) => {
  try {
    const { name, level, description, image } = req.body;
    const course = await Course.create({ name, level, description, image });
    res.status(201).json({
      message: "Course added successfully!",
      data: course,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: "Failed to add course",
      error: error.message,
      data: {},
    });
  }
};

// assign lecture to the instructor
const assignLectureController = async (req, res, next) => {
  try {
    const { courseId, instructorId, date } = req.body;

    const existingLecture = await Course.findOne({
      "lectures.instructor": instructorId,
      "lectures.date": new Date(date),
    });
    if (existingLecture) {
      return res.status(400).json({
        message: "Instructor already booked on this date",
      });
    }

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
    res.status(201).json({
      message: "Lecture assigned to the instructor!",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: "Failed to assigned the lecture to the instructor",
      error: error.message,
    });
  }
};

// get all courses
const getAllCourseController = async (req, res, next) => {
  try {
    const course = await Course.find();
    console.log(course);
    res.status(201).json({
      message: "All courses fetched successfully!",
      data: course,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

const getLecturesByInstructorId = async (req, res) => {
  try {
    const { instructorId } = req.params;
    const objectId = new mongoose.Types.ObjectId(instructorId);

    const lectures = await Course.aggregate([
      { $unwind: "$lectures" },
      { $match: { "lectures.instructor": objectId } },
      {
        $project: {
          _id: 0,
          date: "$lectures.date",
          courseName: "$name",
        },
      },
    ]);

    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCourseController,
  assignLectureController,
  getAllCourseController,
  getLecturesByInstructorId,
};
