const Course = require("../models/courseModel");

const validateLectureHandler = async (req, res, next) => {
  try {
    const { InstructorId, date } = req.body;
    const existingLecture = await Course.findOne({
      "lectures.instructor": InstructorId,
      "lectures.date": new Date(date),
    });
    if (existingLecture) {
      res.status(400);
      throw new Error("Instructor already booked on this date");
    }
  } catch (error) {
    console.error(error.message);
    next();
  }
};

module.exports = validateLectureHandler;
