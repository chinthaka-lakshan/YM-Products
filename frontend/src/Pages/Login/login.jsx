import React from "react";
import "./login.css";
import logo from "../../assets/logo.png";
// import Sidebar from "../../components/Sidebar/Sidebar.jsx";


const Login = () => {
  return (
    <div className="container">
      {/* <Sidebar /> */}

      <div className="full">
        <form>
          <h1>Welcome back!</h1>
          <h3>Enter your Credentials to access your account</h3>

          <h2>Email Address</h2>
          <div className="input-box">
            <input type="email" required placeholder="Enter your email" />
          </div>

          <h2>Password</h2>
          <div className="input-box">
            <input type="password" required placeholder="Enter your password" />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>

        <div className="logo-container">
          <img src={logo} alt="YM Products Logo" />
        </div>
      </div>
      </div>
  );
};

export default Login;
