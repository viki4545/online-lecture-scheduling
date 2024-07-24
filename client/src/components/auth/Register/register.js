import React, { useState } from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(registerUser({ name, email, password }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        registerUser({ name, email, password })
      ).unwrap();
      if (result) {
        navigate(result.role === "admin" ? "/" : `/my-lectures/${user._id}`);
      }
    } catch (err) {
      console.error("Failed to register: ", err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
