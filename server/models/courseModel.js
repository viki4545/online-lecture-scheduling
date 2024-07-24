const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    lectures: [
      {
        instructor: { type: Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
