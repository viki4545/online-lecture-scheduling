import React from "react";
import { Link } from "react-router-dom";
import "./adminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/add-course">Add Course</Link>
        </li>
        <li>
          <Link to="/assign-lecture">Assign Lecture</Link>
        </li>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
