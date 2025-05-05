import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import logo from "../../../assets/YM.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@example.com"); // Default for testing
  const [password, setPassword] = useState("Admin@123"); // Default for testing
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin-login", 
        { email, password },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem("admin_token", response.data.token);
        // Store user data
        localStorage.setItem("admin_user", JSON.stringify(response.data.admin));
        // Navigate to dashboard
        navigate("/admindashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="full">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back, Admin!</h1>
          <h3>Enter your credentials to access your account</h3>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="logo-container">
          <img src={logo} alt="YM Products Logo" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;