import React, { useState } from "react";
import "./AdminShops.css";
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar.jsx";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar.jsx";
import StoreFrontIcon from "@mui/icons-material/Store";

const AdminShops = () => {

    const [shops, setShops] = useState([
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
        { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newShop, setNewShop] = useState({ shopName: "", location: "", contact: "" });
    const [editShop, setEditShop] = useState({ shopName: "", location: "", contact: "" });
    const [editIndex, setEditIndex] = useState(null);

    const handleAddShop = () => {
        setShops([...shops, newShop]);
        setNewShop({ shopName: "", location: "", contact: "" });
        setShowAddModal(false);
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditShop(shops[index]);
        setShowEditModal(true);
    };

    const handleEditShop = () => {
        const updatedShops = [...shops];
        updatedShops[editIndex] = editShop;
        setShops(updatedShops);
        setShowEditModal(false);
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
                            <div key={index} className="ShopCard">
                                <h2>{shop.shopName}</h2>
                                <div className="ShopCardMiddle">
                                    <StoreFrontIcon className="ShopCardIcon"/>
                                    <div className="ShopCardDetails">
                                        <span>{shop.location}</span>
                                        <span>{shop.contact}</span>
                                    </div>
                                </div>
                                <div className="ShopCardButtons">
                                    <button className="DeleteButton">Delete</button>
                                    <button className="EditButton" onClick={() => handleEditClick(index)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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