import React, { useState } from "react";
import "./DistributionStock.css";
import Sidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar.jsx";
import Topbar from "../../components/Topbar/topbar.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DistributionStock = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [items, setItems] = useState([
    { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
    { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
    { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
    { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
    { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
    { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
    { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
    { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
    { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
    { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
  ]);
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar.jsx";
import AdminSidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DistributionStock = () => {

    const [items, setItems] = useState([
        { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
        { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
        { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
        { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
        { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
        { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
        { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
        { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
        { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
        { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
        { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
        { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
        { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
        { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
        { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
        { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
        { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
        { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
        { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
        { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
        { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
        { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
        { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
        { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
        { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
    ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newItem, setNewItem] = useState({
    item: "",
    unitPrice: "",
    quantity: "",
  });
  const [editItem, setEditItem] = useState({
    item: "",
    unitPrice: "",
    quantity: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ item: "", unitPrice: "", quantity: "" });
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
    <div className="DistributionStock">
      <Sidebar onToggle={setSidebarExpanded} />
      <div
        className={`DistributionStockContainer ${
          sidebarExpanded ? "" : "collapsed"
        }`}
      >
        <Topbar />
        <div className="DistributionStockCardsContainer">
          <div className="DistributionStockTop">
            <h1>Distribution Stock</h1>
            <button className="AddButton" onClick={() => setShowAddModal(true)}>
              Add New
            </button>
          </div>
          <div className="DistributionStockGrid">
            {items.map((item, index) => (
              <div key={index} className="DistributionItemCard">
                <h2>{item.item}</h2>
                <div className="DistributionItemCardMiddle">
                  <ShoppingCartIcon className="DistributionItemCardIcon" />
                  <div className="DistributionItemCardDetails">
                    <span>
                      <strong>Price (LKR) : </strong>
                      {item.unitPrice}
                    </span>
                    <span>
                      <strong>Quantity : </strong>
                      {item.quantity}
                    </span>
                  </div>
    return (
        <div className="DistributionStock">
            <AdminSidebar/>
            <div className="DistributionStockContainer">
                <AdminNavbar/>
                <div className="DistributionStockCardsContainer">
                    <div className="DistributionStockTop">
                        <h1>Distribution Stock</h1>
                        <button className="AddButton" onClick={() => setShowAddModal(true)}>Add New</button>
                    </div>
                    <div className="DistributionStockGrid">
                        {items.map((item, index) => (
                            <div key={index} className="DistributionItemCard">
                                <h2>{item.item}</h2>
                                <div className="DistributionItemCardMiddle">
                                    <ShoppingCartIcon className="DistributionItemCardIcon"/>
                                    <div className="DistributionItemCardDetails">
                                        <span><strong>Price (LKR) : </strong>{item.unitPrice}</span>
                                        <span><strong>Quantity : </strong>{item.quantity}</span>
                                    </div>
                                </div>
                                <div className="DistributionItemCardButtons">
                                    <button className="DeleteButton">Delete</button>
                                    <button className="EditButton" onClick={() => handleEditClick(index)}>Update</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="DistributionItemCardButtons">
                  <button className="DeleteButton">Delete</button>
                  <button
                    className="EditButton"
                    onClick={() => handleEditClick(index)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>Add New Distribution Item</h2>
            <div className="ModalMiddle">
              <ShoppingCartIcon className="ModalIcon" />
              <div className="ModalInputs">
                <input
                  type="text"
                  placeholder="Enter Item Name"
                  value={newItem.item}
                  onChange={(e) =>
                    setNewItem({ ...newItem, item: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Unit Price (LKR)"
                  value={newItem.unitPrice}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unitPrice: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Quantity"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="ModalButtons">
              <button
                className="CancelButton"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="SaveButton" onClick={handleAddItem}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>Update Distribution Item</h2>
            <div className="ModalMiddle">
              <ShoppingCartIcon className="ModalIcon" />
              <div className="ModalInputs">
                <input
                  type="text"
                  placeholder="Enter Item Name"
                  value={editItem.item}
                  onChange={(e) =>
                    setEditItem({ ...editItem, item: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Unit Price (LKR)"
                  value={editItem.unitPrice}
                  onChange={(e) =>
                    setEditItem({ ...editItem, unitPrice: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Quantity"
                  value={editItem.quantity}
                  onChange={(e) =>
                    setEditItem({ ...editItem, quantity: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="ModalButtons">
              <button
                className="CancelButton"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="SaveButton" onClick={handleEditItem}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributionStock;
