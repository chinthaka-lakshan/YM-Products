import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import logo from "../../../assets/YM.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [enterOTPMode, setEnterOTPMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);

  const [loadingTransition, setLoadingTransition] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        { email, password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("admin_user", JSON.stringify(response.data.admin));
        localStorage.setItem("username", response.data.admin.name);
        console.log(localStorage.getItem("username"));

        alert(response.data.message); // Show success message
        alert(response.data.message);
        navigate("/admindashboard");
      } else {
        const message = response.data.message || "Login failed";
        alert(message);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetEmail = () => {
    if (!email) {
      alert("Please enter your email to send reset instructions.");
      return;
    }

    // Here, you'd typically call your backend API to send the reset email.
    alert(`OTP sent to ${email}`);
    setEnterOTPMode(true);
  };

  const handleOTP = () => {
    if (!otp) {
      alert("Please Enter The OTP In The Email You Recieved.");
      return;
    }

    // Normally you'd call the backend here
    alert("OTP verified successfully!");
    setChangePasswordMode(true);
  };

  const handleChangePassword = () => {
    if (!newPassword) {
      alert("Please Enter A New Password.");
      return;
    }

    if (newPassword !== repeatPassword) {
      // Throw a browser error if passwords don't match
      alert("Passwords do not match!"); // You can use console.error if you prefer logging to console
      return;
    }

    alert("Password Changed Successfully!");

    // Show loading transition graphic
    setLoadingTransition(true);

    // Delay before navigating back to the login screen
    setTimeout(() => {
      // Reset modes to go back to the initial login screen
      setForgotPasswordMode(false);
      setEnterOTPMode(false);
      setChangePasswordMode(false);

      // Optionally clear fields
      setEmail("");
      setPassword("");
      setOTP("");
      setNewPassword("");
      setRepeatPassword("");

      // Hide loading transition after the delay
      setLoadingTransition(false);
    }, 2000);
  };

  return (
    <div className="AdminLogin">
      <div className="AdminLoginContainer">
        {!forgotPasswordMode && !enterOTPMode && !changePasswordMode ? (
          <form onSubmit={handleSubmit}>
            <h1>Welcome to YM PRODUCTS!</h1>
            <h3>Enter Your Credentials To Access Your Account</h3>
            <div className="InputFields">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="AdminLoginButtons">
              <button type="submit" className="LoginButton" disabled={loading}>
                {loading ? "Logging In..." : "Login"}
              </button>
              <button
                type="button"
                className="ForgotPassword"
                onClick={() => setForgotPasswordMode(true)}
              >
                Forgot Password
              </button>
            </div>
          </form>
        ) : forgotPasswordMode && !enterOTPMode && !changePasswordMode ? (
          <form onSubmit={handleSubmit}>
            <h1>Forgot Your Password?</h1>
            <h3>Enter Your Email To Receive Reset Instructions</h3>
            <div className="InputFields">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="AdminLoginButtons">
              <button
                type="button"
                className="BackButton"
                onClick={() => setForgotPasswordMode(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="SendEmailButton"
                onClick={handleSendResetEmail}
              >
                Send Email
              </button>
            </div>
          </form>
        ) : enterOTPMode && !changePasswordMode ? (
          <form onSubmit={handleSubmit}>
            <h1>Got Your OTP?</h1>
            <h3>Enter Your OTP To Validate Your Identification</h3>
            <div className="InputFields">
              <input
                placeholder="Enter Your OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </div>
            <div className="AdminLoginButtons">
              <button
                type="button"
                className="BackButton"
                onClick={() => setEnterOTPMode(false)}
              >
                Back
              </button>
              <button type="button" className="ConfirmOTP" onClick={handleOTP}>
                Confirm OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
            <h3>Enter A New Password To Gain Access To Your Account</h3>
            <div className="InputFields">
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Repeat New Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            </div>
            <div className="AdminLoginButtons">
              <button
                type="button"
                className="BackButton"
                onClick={() => setChangePasswordMode(false)}
              >
                Back
              </button>
              <button
                type="button"
                className="ChangePassword"
                onClick={handleChangePassword}
              >
                Confirm
              </button>
            </div>
          </form>
        )}

        {/* Displaying the loading graphic if loadingTransition is true */}
        {loadingTransition && (
          <div className="LoadingTransition">
            <div className="spinner"></div> {/* You can style this spinner */}
            <p>Please Wait! Redirecting Back To The Login Page...</p>
          </div>
        )}

        <div className="LogoContainer">
          <img src={logo} alt="YM Products Logo" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
