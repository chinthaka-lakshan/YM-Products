import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import Navbar from "../../components/AdminNavbar/AdminNavbar";
import StoreFrontIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import "./Orders.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/YMlogo.PNG";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [shops, setShops] = useState([
    // {
    //   shopName: "Lakshan Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Hasitha Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Lakshan Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Hasitha Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Lakshan Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Hasitha Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Lakshan Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Hasitha Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Lakshan Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
    // {
    //   shopName: "Hasitha Shop",
    //   location: "Nattandiya",
    //   contact: "076 21326548",
    // },
  ]);

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

  const [items] = useState([
    { item: "Chilli Powder 50g", unitPrice: "250.50", quantity: 52 },
    { item: "Chilli Powder 100g", unitPrice: "480.50", quantity: 22 },
    { item: "Curry Powder 50g", unitPrice: "200.00", quantity: 42 },
    { item: "Curry Powder 100g", unitPrice: "400.00", quantity: 72 },
    { item: "Chilli Pieces 50g", unitPrice: "180.75", quantity: 12 },
    { item: "Chilli Powder 150g", unitPrice: "250.50", quantity: 52 },
    { item: "Chilli Powder 200g", unitPrice: "480.50", quantity: 22 },
    { item: "Curry Powder 500g", unitPrice: "200.00", quantity: 42 },
    { item: "Curry Powder 1000g", unitPrice: "400.00", quantity: 72 },
    { item: "Chilli Pieces 250g", unitPrice: "180.75", quantity: 12 },
    { item: "Chilli Powder 250g", unitPrice: "250.50", quantity: 52 },
    { item: "Chilli Powder 300g", unitPrice: "480.50", quantity: 22 },
    { item: "Curry Powder 150g", unitPrice: "200.00", quantity: 42 },
    { item: "Curry Powder 125g", unitPrice: "400.00", quantity: 72 },
    { item: "Chilli Pieces 700g", unitPrice: "180.75", quantity: 12 },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const [showShopsModal, setShowShopsModal] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);

  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState([]);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null); // new state

  const invoiceRef = useRef();
  const navigate = useNavigate();

  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setShowShopsModal(false);
    setShowItemsModal(true);
  };

  const handleItemSelect = (item) => {
    const exists = selectedItems.find((i) => i.item === item.item);
    if (!exists) {
      setSelectedItems([...selectedItems, { ...item, orderQty: 1 }]);
    }
  };

  const updateItemQuantity = (itemName, newQty) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.item === itemName
          ? { ...item, orderQty: parseInt(newQty) || 0 }
          : item
      )
    );
  };

  const removeSelectedItem = (itemName) => {
    setSelectedItems(selectedItems.filter((item) => item.item !== itemName));
  };

  const checkAdjustedOrderCost = async (shopId, orderAmount) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/calculate-order-cost/${shopId}/${orderAmount}`
      );
      const data = await response.json();
      return data.return_balance;
    } catch (error) {
      console.error("Error fetching order cost", error);
      return orderAmount;
    }
  };

  const userToken = localStorage.getItem("admin_token");
  const handleConfirmOrder = async () => {
    if (!selectedShop || selectedItems.length == 0) return;
    const totalOrderAmount = selectedItems.reduce(
      (sum, item) => sum + item.unitPrice * item.orderQty,
      0
    );

    const getCost = await checkAdjustedOrderCost(
      selectedShop.id,
      totalOrderAmount
    );

    if (editingOrderId !== null) {
      const updatedOrders = orders.map((order) =>
        order.id === editingOrderId
          ? {
              ...order,
              shop: selectedShop.shopName,
              date: new Date().toLocaleDateString(),
              items: selectedItems.filter((item) => item.orderQty > 0),
              total_price: getCost,
            }
          : order
      );
      const updatedOrder = updatedOrders.find((o) => o.id === editingOrderId);
      setOrders(updatedOrders);
      setOrderToEdit(updatedOrder);
      setCurrentInvoiceItems(updatedOrder.items);
      setEditingOrderId(null);
    } else {
      const newOrder = {
        id: orders.length + 1,
        shop_id: selectedShop.id,
        date: new Date().toLocaleDateString(),
        repName: "Raheem",
        status: "Pending",
        total_price: getCost,
        items: selectedItems.filter((item) => item.orderQty > 0),
      };
      console.log(getCost);
      console.log(selectedShop.id);
      console.log(selectedShop);

      //store in DB
      try {
        console.log(userToken);

        const controller = new AbortController();

        const response = await axios.post(
          "http://localhost:8000/api/orders",
          newOrder,
          {
            // method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            //body: JSON.stringify(newOrder),
            //signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Server responded with ${response.status}:${
              response.status
            }:${await response.text()}`
          );
        }
        const data = await response.json();
        console.log("Order saved:", data);

        // setOrders([...orders, newOrder]);
        // setOrderToEdit(newOrder);
        // setCurrentInvoiceItems(newOrder.items);

        setOrders([...orders, newOrder]);
        setOrderToEdit(data);
        setCurrentInvoiceItems(data.items);
      } catch (error) {
        console.error("Error saving order:", error);
      }
    }
    setShowItemsModal(false);
    setSelectedShop(null);
    setSelectedItems([]);
  };

  const handleCancelOrder = () => {
    if (editingOrderId !== null) {
      // Show the Order to Edit modal if updating
      const originalOrder = orders.find((order) => order.id === editingOrderId);
      setOrderToEdit(originalOrder); // Show confirmed order
      setEditingOrderId(null);
      setShowItemsModal(false); // Close items modal
    } else {
      // Navigate to the initial Orders page when adding a new order
      navigate("/adminOrders");
      setShowItemsModal(false);
      setSelectedShop(null);
      setSelectedItems([]);
    }
  };

  const handleGenerateInvoice = () => {
    setShowPopup(true);
  };

  const handleEditOrder = () => {
    if (orderToEdit) {
      const originalOrder = orderToEdit;
      setSelectedShop({ shopName: originalOrder.shop });
      setSelectedItems(originalOrder.items);
      setEditingOrderId(originalOrder.id); // set edit mode
      setOrderToEdit(null);
      setShowItemsModal(true);
    }
  };

  const handlePrint = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("Invoice.pdf");
    });
  };

  return (
    <div className="Orders">
      <Sidebar />
      <div className="OrdersContainer">
        <Navbar />
        <div className="order-title">
          <h1>Orders</h1>
        </div>
        <div className="btn1">
          <Link to="/adminOrdersHistory">
            <button className="history-btn">History</button>
          </Link>
        </div>
        <div className="btn2">
          <button
            className="add-new-btn"
            onClick={() => setShowShopsModal(true)}
          >
            Add New
          </button>
        </div>

        <div className="orders-table-container">
          <table className="tableO">
            <thead>
              <tr>
                <th>Shop</th>
                <th>Date</th>
                <th>Rep Name</th>
                <th>Status</th>
                <th>Items</th>
                <th className="text-center" colSpan="3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.shop}</td>
                  <td>{order.date}</td>
                  <td>{order.repName}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.items
                      ? order.items
                          .map((i) => `${i.item} (${i.orderQty})`)
                          .join(", ")
                      : "—"}
                  </td>
                  <td>
                    <button className="btn view-btn">View</button>
                  </td>
                  <td>
                    <button
                      className="btn accept-btn"
                      onClick={() => handleStatusChange(order.id, "Accepted")}
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn cancel-btn"
                      onClick={() => handleStatusChange(order.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-container-O">
            <ul className="pagination-O">
              <li
                className={`page-item-O ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
              </li>
              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  className={`page-item ${
                    currentPage === number + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link-O"
                    onClick={() => paginate(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item-O ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link-O"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
                    <h2>{shop.shopName}</h2>
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
              <button
                className="CancelButton"
                onClick={() => setShowShopsModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items Modal */}
      {showItemsModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>Select Items for {selectedShop?.shopName}</h2>
            <div className="ScrollableContent">
              <div className="DistributionStockGrid">
                {items.map((item, index) => {
                  const selected = selectedItems.find(
                    (i) => i.item === item.item
                  );
                  return (
                    <div key={index} className="DistributionItemCard">
                      <h2>{item.item}</h2>
                      <div className="DistributionItemCardMiddle">
                        <ShoppingCartIcon className="DistributionItemCardIcon" />
                        <div className="DistributionItemCardDetails">
                          <span>
                            <strong>Price (LKR): </strong>
                            {item.unitPrice}
                          </span>
                          <span>
                            <strong>In Stock: </strong>
                            {item.quantity}
                          </span>
                          {selected ? (
                            <div className="SelectedItemControl">
                              <input
                                type="number"
                                min="1"
                                className="QtyInput"
                                value={selected.orderQty}
                                onChange={(e) =>
                                  updateItemQuantity(item.item, e.target.value)
                                }
                              />
                              <button
                                className="RemoveItemBtn"
                                title="Remove item"
                                onClick={() => removeSelectedItem(item.item)}
                              >
                                ❌
                              </button>
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
              <button className="CancelButton" onClick={handleCancelOrder}>
                Cancel
              </button>
              <button className="ConfirmButton" onClick={handleConfirmOrder}>
                {editingOrderId ? "Update Order" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed Order View */}
      {orderToEdit && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h3>Order</h3>
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
              <button onClick={handleEditOrder}>Edit Order</button>
              <button onClick={handleGenerateInvoice}>Generate Invoice</button>
              <button onClick={() => setOrderToEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Popup */}
      {showPopup && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <div className="invoice-content" ref={invoiceRef}>
              <div className="invoice-header">
                <img src={logo} alt="Invoice Logo" className="invoice-logo" />
                <div>
                  <h2>{selectedShop?.shopName}</h2>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <div className="invoice-number">
                  <h2>Invoice</h2>
                  <p>Order ID</p>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoiceItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item}</td>
                      <td>{item.orderQty}</td>
                      <td>Rs. {item.unitPrice}</td>
                      <td>Rs. {item.orderQty * item.unitPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="invoice-total">
                <p>Sub Total: Rs. 150,000</p>
                <p>Discount: 10%</p>
                <p>
                  <strong>Total Due: Rs. 135,000</strong>
                </p>
              </div>
            </div>
            <div className="invoice-buttons">
              <button className="print-btn" onClick={handlePrint}>
                Print
              </button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
