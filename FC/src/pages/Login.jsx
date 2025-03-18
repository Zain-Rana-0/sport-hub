import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";


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
  }
  , [userInLocalStorage, navigate]);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                           focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="********"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </button>
        </form>
        <div className="auth-container mt-4 text-center">
          {showLogin ? (
            <>
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => (window.location.href = "/registration")}
                  className="text-purple-600 hover:underline"
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
                  className="text-purple-600 hover:underline"
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
