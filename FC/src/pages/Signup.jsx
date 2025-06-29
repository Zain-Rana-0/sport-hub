import React, { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css"; // Assuming you have a CSS file for styling

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user", // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );
      console.log(response);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        
        if(response.data.user.role === "admin") {
          navigate("/clubregistration");
        }
        else {
          navigate("/");
        }
      }

    } catch (err) {
      setError(err.response?.data?.message || "Error during registration");
    }
  };

  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthPage = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h2 className="signup-title">
          Create Account
        </h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="form-input"
              placeholder="John"
              required
            />
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Doe"
              required
            />
          </div>
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
              required
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
                required
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
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="form-select"
              required
            >
              <option value="user">Regular User</option>
              <option value="admin">Club's Admin</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-btn">
            <UserPlus className="submit-icon" />
            Sign Up
          </button>
          <div className="auth-container">
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => (window.location.href = "/login")}
                className="auth-link"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}