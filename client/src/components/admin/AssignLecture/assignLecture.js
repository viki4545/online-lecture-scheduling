import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignLecture,
  fetchCourses,
} from "../../../features/courses/coursesSlice";
import "./assignLecture.css";
import { fetchInstructor } from "../../../features/instructors/instructorsSlice";

const AssignLecture = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.items);
  const instructors = useSelector((state) => state.instructors.items);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchInstructor());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCourse || !selectedInstructor || !date) {
      setError("All fields are required");
      return;
    }

    dispatch(
      assignLecture({
        courseId: selectedCourse,
        instructorId: selectedInstructor,
        date,
      })
    )
      .unwrap()
      .then(() => {
        setSelectedCourse("");
        setSelectedInstructor("");
        setDate("");
        setError("");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <h2>Assign Lecture</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses?.data?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <select
            id="instructor"
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
          >
            <option value="">Select Instructor</option>
            {instructors?.data?.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" onClick={handleSubmit}>
          Assign Lecture
        </button>
      </form>
    </div>
  );
};

export default AssignLecture;
