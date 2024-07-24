import React, { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser({ email, password }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result) {
        navigate(result.role === "admin" ? "/" : `/my-lectures/${result._id}`);
      }
    } catch (err) {
      console.error("Failed to login: ", err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
