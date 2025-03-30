import "./topBar.css";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi"; // Mobile menu icon

const TopBar = () => {
  return (
    <div className="topbar">
      {/* Left side - Logo */}
      <div className="topbar-left">
        <span className="logo">
          <span className="logo-highlight">YM</span> Products
        </span>
      </div>

      {/* Right side - Admin Info */}
      <div className="topbar-right">
        <div className="admin-info">
          <FaUserCircle className="admin-icon" />
          <span className="admin-name">Admin</span>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon">
        <FiMenu />
      </div>
    </div>
  );
};

export default TopBar;
