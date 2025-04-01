import React, { useState } from "react";
import "./PurchaseStock.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar.jsx";
import InventoryIcon from "@mui/icons-material/ShoppingCart";

const PurchaseStock = () => {

    const [items, setItems] = useState([
        { item: "Dry Chilli", weight: 5.4 },
        { item: "Ginger", weight: 5 },
        { item: "Turmeric", weight: 3.4 },
        { item: "Pepper", weight: 5.8 },
        { item: "Cinnamon", weight: 4 },
        { item: "Dry Chilli", weight: 5.4 },
        { item: "Ginger", weight: 5 },
        { item: "Turmeric", weight: 3.4 },
        { item: "Pepper", weight: 5.8 },
        { item: "Cinnamon", weight: 4 },
        { item: "Dry Chilli", weight: 5.4 },
        { item: "Ginger", weight: 5 },
        { item: "Turmeric", weight: 3.4 },
        { item: "Pepper", weight: 5.8 },
        { item: "Cinnamon", weight: 4 },
        { item: "Dry Chilli", weight: 5.4 },
        { item: "Ginger", weight: 5 },
        { item: "Turmeric", weight: 3.4 },
        { item: "Pepper", weight: 5.8 },
        { item: "Cinnamon", weight: 4 },
        { item: "Dry Chilli", weight: 5.4 },
        { item: "Ginger", weight: 5 },
        { item: "Turmeric", weight: 3.4 },
        { item: "Pepper", weight: 5.8 },
        { item: "Cinnamon", weight: 4 },
        { item: "Dry Chilli", weight: 5.4 },
        { item: "Ginger", weight: 5 },
        { item: "Turmeric", weight: 3.4 },
        { item: "Pepper", weight: 5.8 },
        { item: "Cinnamon", weight: 4 },
    ]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newItem, setNewItem] = useState({ item: "", weight: "" });
    const [editItem, setEditItem] = useState({ item: "", weight: "" });
    const [editIndex, setEditIndex] = useState(null);

    const handleAddItem = () => {
        setItems([...items, newItem]);
        setNewItem({ item: "", weight: "" });
        setShowAddModal(false);
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setEditItem(items[index]);
        setShowEditModal(true);
    };

    const handleEditItem = () => {
        const updatedItems = [...items];
        updatedItems[editIndex] = editItem;
        setItems(updatedItems);
        setShowEditModal(false);
    };

    return (
        <div className="PurchaseStock">
            <AdminSidebar/>
            <div className="PurchaseStockContainer">
                <AdminNavbar/>
                <div className="PurchaseStockCardsContainer">
                    <div className="PurchaseStockTop">
                        <h1>Purchase Stock</h1>
                        <button className="AddButton" onClick={() => setShowAddModal(true)}>Add New</button>
                    </div>
                    <div className="PurchaseStockGrid">
                        {items.map((item, index) => (
                            <div key={index} className="PurchaseItemCard">
                                <h2>{item.item}</h2>
                                <div className="PurchaseItemCardMiddle">
                                    <InventoryIcon className="PurchaseItemCardIcon"/>
                                    <div className="PurchaseItemCardDetails">
                                        <span><strong>Weight (kg) : </strong>{item.weight}</span>
                                    </div>
                                </div>
                                <div className="PurchaseItemCardButtons">
                                    <button className="DeleteButton">Delete</button>
                                    <button className="EditButton" onClick={() => handleEditClick(index)}>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showAddModal && (
                <div className="ModalBackdrop">
                    <div className="Modal">
                        <h2>Add New Purchase Item</h2>
                        <div className="ModalMiddle">
                            <InventoryIcon className="ModalIcon"/>
                            <div className="ModalInputs">
                                <input
                                    type="text"
                                    placeholder="Enter Item Name"
                                    value={newItem.item}
                                    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                                />
                                <input 
                                    type="text"
                                    placeholder="Enter Weight (kg)"
                                    value={newItem.weight}
                                    onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="ModalButtons">
                            <button className="CancelButton" onClick={() => setShowAddModal(false)}>Cancel</button>
                            <button className="SaveButton" onClick={handleAddItem}>Save</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="ModalBackdrop">
                    <div className="Modal">
                        <h2>Update Purchase Item</h2>
                        <div className="ModalMiddle">
                            <InventoryIcon className="ModalIcon"/>
                            <div className="ModalInputs">
                                <input
                                    type="text" 
                                    placeholder="Enter Item Name" 
                                    value={editItem.item} 
                                    onChange={(e) => setEditItem({ ...editItem, item: e.target.value })}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Enter Weight (kg)" 
                                    value={editItem.weight} 
                                    onChange={(e) => setEditItem({ ...editItem, weight: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="ModalButtons">
                            <button className="CancelButton" onClick={() => setShowEditModal(false)}>Cancel</button>
                            <button className="SaveButton" onClick={handleEditItem}>Update</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default PurchaseStock;