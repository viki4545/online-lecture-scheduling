import React, { useState } from "react";
import "./addCourse.css";
import { useDispatch } from "react-redux";
import { addCourse } from "../../../features/courses/coursesSlice";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCourse({ name, level, description, image }));
    setName("");
    setLevel("");
    setDescription("");
    setImage("");
  };

  return (
    <div className="container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Level:</label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
