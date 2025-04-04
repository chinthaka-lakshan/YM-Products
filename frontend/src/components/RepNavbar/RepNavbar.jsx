import React, { useState } from "react";
import "./RepNavbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const RepNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogoutPopup = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="RepNavbar">
      <div className="RepNavbarContainer">
        <span className="RepNavbarTitle">SALES REP DASHBOARD</span>
        <div className="RepNavbarLog" onClick={toggleLogoutPopup}>
          <span>Rep1</span>
          <AccountCircleIcon className="RepProfileIcon" />
        </div>
      </div>

      {showLogout && (
        <div className="RepLogoutPopup">
          <div className="RepPopupContent">
            <p>Are you sure you want to log out?</p>
            <button className="RepPopupLogoutButton">Logout</button>
            <button className="RepPopupCancelButton" onClick={toggleLogoutPopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepNavbar;