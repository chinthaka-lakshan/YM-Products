import React, { useState } from "react";
import "./Shops.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Topbar from "../../components/Topbar/topbar.jsx";
import StoreIcon from "@mui/icons-material/Store";

const Shops = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
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
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newShop, setNewShop] = useState({ shopName: "", location: "", contact: "" });
    const [editShop, setEditShop] = useState({ shopName: "", location: "", contact: "" });
    const [editIndex, setEditIndex] = useState(null);

    // Handle adding a shop
    const handleAddShop = () => {
        setShops([...shops, newShop]);
        setNewShop({ shopName: "", location: "", contact: "" });
        setShowAddModal(false);
    };

    // Handle opening the edit popup
    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditShop(shops[index]); // Pre-fill existing shop data
        setShowEditModal(true);
    };

    // Handle saving edited shop details
    const handleEditShop = () => {
        const updatedShops = [...shops];
        updatedShops[editIndex] = editShop;
        setShops(updatedShops);
        setShowEditModal(false);
    };

    return (
        <div className="Shops">
            <Sidebar onToggle={setSidebarExpanded}/>
            <div className={`ShopsContainer ${sidebarExpanded ? "" : "collapsed"}`}>
                <Topbar/>
                <div className="ShopCardsContainer">
                    <button className="AddButton" onClick={() => setShowAddModal(true)}>Add New</button>
                    <div className="ShopsGrid">
                        {shops.map((shop, index) => (
                            <div key={index} className="ShopCard">
                                <h2>{shop.shopName}</h2>
                                <div className="ShopCardMiddle">
                                    <StoreIcon className="ShopCardIcon"/>
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

            {/* Add Shop Modal */}
            {showAddModal && (
                <div className="ModalBackdrop">
                    <div className="Modal">
                        <StoreIcon className="ModalIcon"/>
                        <h2>Add New Shop</h2>
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
                        <div className="ModalButtons">
                            <button className="CancelButton" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="SaveButton" onClick={handleAddShop}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Shop Modal */}
            {showEditModal && (
                <div className="ModalBackdrop">
                    <div className="Modal">
                        <StoreIcon className="ModalIcon"/>
                        <h2>Edit Shop</h2>
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
                        <div className="ModalButtons">
                            <button className="CancelButton" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="SaveButton" onClick={handleEditShop}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shops;