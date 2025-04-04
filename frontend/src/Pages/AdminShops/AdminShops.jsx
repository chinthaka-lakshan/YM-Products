import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminShops.css";
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar.jsx";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar.jsx";
import StoreFrontIcon from "@mui/icons-material/Store";

const AdminShops = () => {
    const [shops, setShops] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newShop, setNewShop] = useState({ shopName: "", location: "", contact: "" });
    const [editShop, setEditShop] = useState({ shopName: "", location: "", contact: "" });
    const [editIndex, setEditIndex] = useState(null);

    // ✅ Fetch shops from backend
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/shops")
            .then(response => setShops(response.data))
            .catch(error => console.error("Error fetching shops:", error));
    }, []);

    // ✅ Add a new shop
    const handleAddShop = () => {
        axios.post("http://127.0.0.1:8000/api/shops", newShop)
            .then(response => {
                setShops([...shops, response.data]);
                setNewShop({ shopName: "", location: "", contact: "" });
                setShowAddModal(false);
            })
            .catch(error => console.error("Error adding shop:", error));
    };

    // ✅ Open edit modal
    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditShop(shops[index]);
        setShowEditModal(true);
    };

    // ✅ Update shop details
    const handleEditShop = () => {
        axios.put(`http://127.0.0.1:8000/api/shops/${shops[editIndex].id}`, editShop)
            .then(response => {
                const updatedShops = [...shops];
                updatedShops[editIndex] = response.data;
                setShops(updatedShops);
                setShowEditModal(false);
            })
            .catch(error => console.error("Error updating shop:", error));
    };

    // ✅ Delete a shop
    const handleDeleteShop = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/shops/${id}`)
            .then(() => {
                setShops(shops.filter(shop => shop.id !== id));
            })
            .catch(error => console.error("Error deleting shop:", error));
    };

    return (
        <div className="Shops">
            <AdminSidebar/>
            <div className="ShopsContainer">
                <AdminNavbar/>
                <div className="ShopCardsContainer">
                    <div className="ShopsTop">
                        <h1>Shops</h1>
                        <button className="AddButton" onClick={() => setShowAddModal(true)}>Add New</button>
                    </div>
                    <div className="ShopsGrid">
                        {shops.map((shop, index) => (
                            <div key={shop.id} className="ShopCard">
                                <h2>{shop.shop_name}</h2>
                                <div className="ShopCardMiddle">
                                    <StoreFrontIcon className="ShopCardIcon"/>
                                    <div className="ShopCardDetails">
                                        <span>{shop.location}</span>
                                        <span>{shop.contact}</span>
                                    </div>
                                </div>
                                <div className="ShopCardButtons">
                                    <button className="DeleteButton" onClick={() => handleDeleteShop(shop.id)}>Delete</button>
                                    <button className="EditButton" onClick={() => handleEditClick(index)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ✅ Add Shop Modal */}
            {showAddModal && (
                <div className="ModalBackdrop">
                    <div className="Modal">
                        <h2>Add New Shop</h2>
                        <div className="ModalMiddle">
                            <StoreFrontIcon className="ModalIcon"/>
                            <div className="ModalInputs">
                                <input
                                    type="text"
                                    placeholder="Enter Shop Name"
                                    value={newShop.shopName}
                                    onChange={(e) => setNewShop({ ...newShop, shopName: e.target.value })}
                                />
                                <input 
                                    type="text"
                                    placeholder="Enter Location"
                                    value={newShop.location}
                                    onChange={(e) => setNewShop({ ...newShop, location: e.target.value })}
                                />
                                <input 
                                    type="text"
                                    placeholder="Enter Contact Number"
                                    value={newShop.contact}
                                    onChange={(e) => setNewShop({ ...newShop, contact: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="ModalButtons">
                            <button className="CancelButton" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="SaveButton" onClick={handleAddShop}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Edit Shop Modal */}
            {showEditModal && (
                <div className="ModalBackdrop">
                    <div className="Modal">
                        <h2>Edit Shop</h2>
                        <div className="ModalMiddle">
                            <StoreFrontIcon className="ModalIcon"/>
                            <div className="ModalInputs">
                                <input 
                                    type="text" 
                                    placeholder="Enter Shop Name" 
                                    value={editShop.shopName} 
                                    onChange={(e) => setEditShop({ ...editShop, shopName: e.target.value })}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Enter Location" 
                                    value={editShop.location} 
                                    onChange={(e) => setEditShop({ ...editShop, location: e.target.value })}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Enter Contact Number" 
                                    value={editShop.contact} 
                                    onChange={(e) => setEditShop({ ...editShop, contact: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="ModalButtons">
                            <button className="CancelButton" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="SaveButton" onClick={handleEditShop}>Update</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminShops;
