import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./RepDashboard.css";
import RepSidebar from "../../../components/Sidebar/RepSidebar/RepSidebar";
import RepNavbar from "../../../components/RepNavbar/RepNavbar";
import orderIcon from "../../../assets/oder.png";
import returnIcon from "../../../assets/return.png";
import GoodReturnIcon from "../../../assets/GoodReturn.png";
import BadReturnIcon from "../../../assets/BadReturn.png";
import StoreFrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axios from "axios";

const RepDashboard = () => {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showShopsModal, setShowShopsModal] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);

  const [shops, setShops] = useState([]);
  //fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/shops");
        setShops(response.data);
      } catch (error) {
        console.error("Error fetching shops: ", error);
      }
    };
    fetchShops();
  }, []);

  const [items, setItems] = useState([]);
  //fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items: ", error);
      }
    };
    fetchItems();
  }, []);

  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [isReturn, setIsReturn] = useState(false); // To distinguish between order/return
  const [isGood, setIsGood] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null); // For viewing confirmed order

  const handleAddOrderClick = () => {
    setIsReturn(false);
    setShowShopsModal(true);
  };

  const handleAddReturnClick = () => {
    setIsReturn(true);
    setShowReturnModal(true);
  };

  const handleAddGoodReturnClick = () => {
    setShowReturnModal(false);
    setShowShopsModal(true);
    setIsGood(true);
  };

  const handleAddBadReturnClick = () => {
    setShowReturnModal(false);
    setShowShopsModal(true);
    setIsGood(false);
  };

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setShowShopsModal(false);
    setShowItemsModal(true);
    // Load items from backend if needed
  };

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, { item: item.item, orderQty: 1, unitPrice: item.unitPrice }]);
  };

  const updateItemQuantity = (itemName, quantity) => {
    setSelectedItems((prev) =>
      prev.map((i) => (i.item === itemName ? { ...i, orderQty: quantity } : i))
    );
  };

  const removeSelectedItem = (itemName) => {
    setSelectedItems((prev) => prev.filter((i) => i.item !== itemName));
  };

  const handleCancelOrder = () => {
    setSelectedItems([]);
    setSelectedShop(null);
    setShowItemsModal(false);
    setEditingOrderId(null);
  };

  const handleConfirmOrder = () => {
    const confirmedOrder = {
      shop: selectedShop,
      items: selectedItems,
      isReturn: isReturn,
      isGood: isGood
    };

    setOrderToEdit(confirmedOrder); // Show confirmed view
    setShowItemsModal(false);
    setSelectedItems([]);
    setSelectedShop(null);
  };

  const handleEditOrder = () => {
    if (orderToEdit) {
      setSelectedShop(orderToEdit.shop);
      setSelectedItems(orderToEdit.items);
      setIsReturn(orderToEdit.isReturn);
      setShowItemsModal(true);
      setOrderToEdit(null);
    }
  };

  const handleGenerateInvoice = () => {
    console.log("Generating invoice for:", orderToEdit);
    // Logic to generate invoice (PDF/download/API call)
  };

  return (
    <div className="RepDashboard">
      <RepSidebar />
      <div className="RepDashboardContainer">
        <RepNavbar />
        <div className="RepButtonsContainer">
          <div className="RepButton" onClick={handleAddOrderClick}>
            <img src={orderIcon} alt="Add Order" />
            <p>Add Order</p>
          </div>
          <div className="RepButton" onClick={handleAddReturnClick}>
            <img src={returnIcon} alt="Add Return" />
            <p>Add Return</p>
          </div>
        </div>
      </div>

      {/* Return Type Modal */}
      {showReturnModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>Select Return Type</h2>
            <div className="ScrollableContent">
              <div className="ReturnButtonsContainer">
                <div className="ReturnButton" onClick={handleAddGoodReturnClick}>
                  <img src={GoodReturnIcon} alt="Good Return" />
                  <p>Good Return</p>
                </div>
                <div className="ReturnButton" onClick={handleAddBadReturnClick}>
                  <img src={BadReturnIcon} alt="Bad Return" />
                  <p>Bad Return</p>
                </div>
              </div>
            </div>
            <div className="ModalButtons">
              <button className="CancelButton" onClick={() => setShowReturnModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}


      {/* Shops Modal */}
      {showShopsModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>Select Shop</h2>
            <div className="ScrollableContent">
              <div className="ShopsGrid">
                {shops.map((shop, index) => (
                  <div
                    key={index}
                    className="ShopCard"
                    onClick={() => handleShopSelect(shop)}
                  >
                    <h2>{shop.shop_name}</h2>
                    <div className="ShopCardMiddle">
                      <StoreFrontIcon className="ShopCardIcon" />
                      <div className="ShopCardDetails">
                        <span>{shop.location}</span>
                        <span>{shop.contact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ModalButtons">
              <button className="CancelButton" onClick={() => setShowShopsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Items Modal */}
      {showItemsModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>{isReturn ? "Select Return Items" : `Select Items for ${selectedShop?.shop_name}`}</h2>
            <div className="ScrollableContent">
              <div className="DistributionStockGrid">
                {items.map((item, index) => {
                  const selected = selectedItems.find((i) => i.item === item.item);
                  return (
                    <div key={index} className="DistributionItemCard">
                      <h2>{item.item}</h2>
                      <div className="DistributionItemCardMiddle">
                        <ShoppingCartIcon className="DistributionItemCardIcon" />
                        <div className="DistributionItemCardDetails">
                          <span><strong>Price (LKR): </strong>{item.unitPrice}</span>
                          <span><strong>In Stock: </strong>{item.quantity}</span>
                          {selected ? (
                            <div className="SelectedItemControl">
                              <input
                                type="number"
                                min="1"
                                className="QtyInput"
                                value={selected.orderQty}
                                onChange={(e) => updateItemQuantity(item.item, e.target.value)}
                              />
                              <button
                                className="RemoveItemBtn"
                                title="Remove item"
                                onClick={() => removeSelectedItem(item.item)}
                              ></button>
                            </div>
                          ) : (
                            <button
                              className="SelectItemBtn"
                              onClick={() => handleItemSelect(item)}
                            >
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ModalButtons">
              <button className="CancelButton" onClick={handleCancelOrder}>Cancel</button>
              <button className="ConfirmButton" onClick={handleConfirmOrder}>
                {editingOrderId ? "Update Order" : isReturn ? "Confirm Return" : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed Order View */}
      {orderToEdit && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <div className="abc">
              <span className="order-number">{orderToEdit.isReturn ? "Return" : "Order"}</span>
            </div>
            <table className="confirmedOrderTable">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderToEdit.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item}</td>
                    <td>{item.orderQty}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.orderQty * item.unitPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="Action">
              <button onClick={handleEditOrder}>Edit {orderToEdit.isReturn ? "Return" : "Order"}</button>
              <button onClick={handleGenerateInvoice}>Generate Invoice</button>
              <button onClick={() => setOrderToEdit(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RepDashboard;