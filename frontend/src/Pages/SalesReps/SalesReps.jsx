import React from "react";
import "./SalesReps.css";
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { Link } from "react-router-dom";


const SalesReps = () => {
  const representatives = [
    { name: "Rashen", email: "rashen@123", contact: "0761236548", nic: "200025456832" },
    { name: "Rashen", email: "rashen@123", contact: "0761236548", nic: "200025456832" },
    { name: "Rashen", email: "rashen@123", contact: "0761236548", nic: "200025456832" },
    { name: "Rashen", email: "rashen@123", contact: "0761236548", nic: "200025456832" },
  ];

  return (
    <div className="sales-reps">
        <AdminSidebar/>
        
      <div className="header-section">
      <AdminNavbar/>
        <h2>Representatives</h2>
        <Link to={"/repRegistration"}>
          <button className="add-new">Add New</button>
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>NIC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {representatives.map((rep, index) => (
              <tr key={index}>
                <td>{rep.name}</td>
                <td>{rep.email}</td>
                <td>{rep.contact}</td>
                <td>{rep.nic}</td>
                <td className="actions">

                  <Link to ={"/editrep"}>
                  <button className="edit">Edit</button>
                  </Link>
                 
                  <button className="delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button>{"<"}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{"..."}</button>
        <button>40</button>
        <button>{">"}</button>
      </div>
    </div>
  );
};

export default SalesReps;
