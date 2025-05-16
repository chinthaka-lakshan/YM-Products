import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import Navbar from "../../components/AdminNavbar/AdminNavbar";
import "./RepRegistration.css";
import { useNavigate } from "react-router-dom";

const RepRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nic: "",
    contact_number: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        // 🌐 Connects to Laravel backend store() function
        "http://localhost:8000/api/sales-rep/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Representative registered successfully");
        setFormData({
          name: "",
          email: "",
          nic: "",
          contact_number: "",
          password: "",
        });

        navigate("/salesreps");
      } else {
        alert("Failed to register: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="rep-container">
      <Sidebar />
      <div>
        <Navbar />
      </div>
      <div className="registration-form">
        <h2>Representative Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label>NIC</label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                placeholder="Enter NIC"
                required
              />
            </div>

            <div>
              <label>Contact Number</label>
              <input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="full-width">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          
          <button type="submit" className="register-btn" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </div>

      {/* Displaying the loading graphic if loading is true */}
      {loading && (
        <div className="Loading">
          <div className="spinner"></div> {/* You can style this spinner */}
          <p>Please Wait! Registering The Sales Rep...</p>
        </div>
      )}

    </div>
  );
};

export default RepRegistration;
