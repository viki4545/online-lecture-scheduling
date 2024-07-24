import React from "react";
import { Link, useParams } from "react-router-dom";
import "./instructorNavbar.css";

const InstructorNavbar = () => {
  const { id } = useParams();
  return (
    <nav className="instructor-navbar">
      <ul>
        <li>
          <Link to={`/my-lectures/${id}`}>My Lectures</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default InstructorNavbar;
