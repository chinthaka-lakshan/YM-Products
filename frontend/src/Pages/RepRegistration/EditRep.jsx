import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import Navbar from "../../components/AdminNavbar/AdminNavbar";
import "./EditRep.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditRep = () => {
  const { id } = useParams();
  const [repData, setRepData] = useState({
    name: "",
    email: "",
    nic: "",
    contact_number: "",
    
  });

    const navigate = useNavigate(); 

  useEffect(() => {
    if (!id) {
      console.warn("No ID found in URL!");
      return;
    }

    console.log("Fetching rep data for ID:", id);

    axios
      .get(`http://localhost:8000/api/sales_reps/${id}`) // update if your backend is on a different port
      .then((res) => {
        console.log("Fetched rep data:", res.data);
        setRepData({
          name: res.data.name || "",
          email: res.data.email || "",
          nic: res.data.nic || "",
          contact_number: res.data.contact_number || "",
           // usually keep password empty
        });
       
      })
      .catch((err) => {
        console.error("Error fetching representative:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting data:", repData);

    axios
      .put(`http://localhost:8000/api/sales_reps/${id}`, repData)
      .then((res) => {
        alert("Representative updated successfully!");
        console.log("Update response:", res.data);
      })
      navigate("/salesreps")
      .catch((err) => {
        console.error("Error updating representative:", err);
      });
  };

  return (
    <div className="editrep-container">
      <Sidebar />
      <div>
        <Navbar />
      </div>
      <div className="editregistration-form">
        <h2>Edit Representative</h2>
        <form onSubmit={handleSubmit}>
          <div className="editform-group">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={repData.name}
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
                value={repData.email}
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
                value={repData.nic}
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
                value={repData.contact_number}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
              />
            </div>

           
          </div>

          <button type="submit" className="editregister-btn">
            Save Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRep;
