import React, { useEffect, useState } from "react";
import "./instructorLectureView.css";
import { useDispatch, useSelector } from "react-redux";
// import { fetchInstructor } from "../../../features/instructors/instructorsSlice";
import { fetchLecturesByInstructorId } from "../../../features/courses/coursesSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const InstructorLectureView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    items: lectures,
    status,
    error,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    if (id) {
      dispatch(fetchLecturesByInstructorId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (status === "Failed") {
      toast.error(error);
    }
  }, [status, error]);

  return (
    <div className="container">
      <h1>My Lectures</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <div>
          <h2>Lectures Assigned to You:</h2>
          <ul>
            {lectures?.length > 0 ? (
              lectures?.map((lecture) => (
                <li key={lecture?._id}>
                  <strong>Date:</strong>{" "}
                  {new Date(lecture.date).toLocaleDateString()} <br />
                  <strong>Course:</strong> {lecture.courseName}
                </li>
              ))
            ) : (
              <p>No lectures assigned.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstructorLectureView;
