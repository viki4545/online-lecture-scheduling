import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import LogoutButton from "../LogoutButton/logoutButton";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <header className="header">
      <div className="container">
        <h1>Online Lecture Scheduling</h1>
        <nav>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
