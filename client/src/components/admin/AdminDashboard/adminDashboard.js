import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../features/courses/coursesSlice.js";
import "./adminDashboard.css";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.items);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="course-list">
        <h3>Courses</h3>
        <ul>
          {courses?.data?.map((course) => (
            <li key={course._id}>
              <h3>{course.name}</h3>
              <p>Level: {course.level}</p>
              <p>Description: {course.description}</p>
              {course.image && <img src={course.image} alt={course.name} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
