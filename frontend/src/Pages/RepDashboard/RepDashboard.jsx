import React from "react";
import "./RepDashboard.css";
import orderIcon from "../../assets/oder.png"; // Update with actual path
import returnIcon from "../../assets/return.png"; // Update with actual path
import Sidebar from "../../components/Sidebar/Sidebar";
import TopBar from "../../components/Topbar/topbar";

const RepDashboard = () => {
  return (
    <div className="dashboard-container">
        <Sidebar/>
        <TopBar/>
      <div className="welcome-text">
        <h2>Welcome to YM Products</h2>
      </div>
      <div className="buttons-container">
        <div className="dashboard-button">
          <img src={orderIcon} alt="Order" />
          <p>Order</p>
        </div>
        <div className="dashboard-button">
          <img src={returnIcon} alt="Return" />
          <p>Return</p>
        </div>
      </div>
    </div>
  );
};

export default RepDashboard;
