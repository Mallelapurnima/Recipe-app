import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useAuthDispatch } from "../../services/context/AuthContext";
import "../Login/Login.css";
import passwordIcon from "../../assests/images/password-icon.png";
import { LOGIN_USER } from "../../services/graphql/LoginGraphql";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER);
  const dispatch = useAuthDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ variables: { username, password } });
      if (data?.login?.token) {
        localStorage.setItem("token", data.login.token);
        dispatch({ type: "LOGIN", payload: { token: data.login.token } });
        navigate("/recipes");
      } else {
        alert("Login failed: No token received from server.");
      }
    } catch (error) {
     alert("Login failed: " + (error.message || "Unknown error"));
    }
  };
  
  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1>Recipe Manager</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={passwordIcon}
                alt="Toggle visibility"
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <button className="loginButton" type="submit">
            Login
          </button>
        </form>
        <div className="register-link">
          <a href="/register"> Don't have an account? Register</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
