import React from "react";
import Sidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import Navbar from "../../components/AdminNavbar/AdminNavbar";
import "./EditRep.css";



const EditRep = () => {
    


  return (
    <div className="editrep-container">
      <Sidebar />
      <div>
      <Navbar/>
      </div>
        <div className="editregistration-form">
          <h2>Edit Representative</h2>
          <form>
            <div className="editform-group">
              <div>
                <label>Name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>

              <div>
                <label>Email Address</label>
                <input type="email" placeholder="Enter email" required />
              </div>

              <div>
                <label>NIC</label>
                <input type="text" placeholder="Enter NIC" required />
              </div>

              <div>
                <label>Contact Number</label>
                <input type="text" placeholder="Enter contact number" required />
              </div>

              <div className="editfull-width">
                <label>Password</label>
                <input type="password" placeholder="Enter password" required />
              </div>
            </div>

            <button type="submit" className="editregister-btn">Save Edit</button>
          </form>
        </div>
      </div>
  );
}

export default EditRep;