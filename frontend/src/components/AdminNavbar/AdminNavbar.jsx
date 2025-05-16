import React, { useState, useRef, useEffect } from "react";
import "./AdminNavbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const popupRef = useRef(null);
  const navigate = useNavigate();

  // Load admin name from localStorage on component mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin_user");
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setAdminName(adminData.name || "Admin");
    }
  }, []);

  const toggleLogoutPopup = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (token) {
        await axios.post("http://localhost:8000/api/admin/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear all admin-related data from localStorage
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("username");
      
      // Redirect to login page and refresh
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    if (showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  return (
    <div className="AdminNavbar">
      <div className="AdminNavbarContainer">
        <span className="NavbarTitle">ADMIN DASHBOARD</span>
        <div className="NavbarLog" onClick={toggleLogoutPopup}>
          <span>{adminName}</span>
          <AccountCircleIcon className="ProfileIcon" />
        </div>
      </div>

      {showLogout && (
        <div className="LogoutPopup">
          <div className="PopupContent" ref={popupRef}>
            <p>Are you sure you want to log out?</p>
            <button className="PopupLogoutButton" onClick={handleLogout}>
              Logout
            </button>
            <button className="PopupCancelButton" onClick={toggleLogoutPopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;