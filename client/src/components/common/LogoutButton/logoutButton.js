import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./logoutButton.css";
import axios from "axios";
import { logout } from "../../../features/auth/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear cookies (for token) if backend supports it
      await axios.post("/api/auth/logout");

      // Clear user state
      dispatch(logout());

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
