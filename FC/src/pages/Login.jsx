import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const userInLocalStorage = localStorage.getItem("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (userInLocalStorage) {
      navigate("/");
    }
  }, [userInLocalStorage, navigate]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (formData.email === "" || formData.password === "") {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      if (!err.response) {
        setError(
          "Cannot connect to server. Please check if the server is running."
        );
      } else if (err.response.status === 401) {
        setError("Invalid email or password");
      } else if (err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2 className="login-title">
          Welcome Back
        </h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input password-input"
                placeholder="********"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? (
                  <EyeOff className="eye-icon" />
                ) : (
                  <Eye className="eye-icon" />
                )}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">
            <LogIn className="submit-icon" />
            Sign In
          </button>
        </form>
        <div className="auth-container">
          {showLogin ? (
            <>
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => (window.location.href = "/registration")}
                  className="auth-link"
                >
                  Sign up here
                </button>
              </p>
            </>
          ) : (
            <>
              <Signup />
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="auth-link"
                >
                  Login here
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}