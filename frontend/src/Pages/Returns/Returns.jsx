import React, { useState, useRef } from 'react';
import './Returns.css';
import Sidebar from '../../components/Sidebar/AdminSidebar/AdminSidebar';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import StoreFrontIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/YMlogo.PNG";

const Returns = () => {
  const [returns, setReturns] = useState([]);

   const [viewingReturns, setViewingReturns] = useState(null); // For viewing returns popup

   const handleViewReturns = (returns) => {
    setViewingReturns(returns);
  };

  const [shops] = useState([
    { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Lakshan Shop", location: "Nattandiya", contact: "076 21326548" },
    { shopName: "Hasitha Shop", location: "Nattandiya", contact: "076 21326548" },
  ]);

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
  const returnsPerPage = 5;

  const [returnType, setReturnType] = useState(null);

  const [showShopsModal, setShowShopsModal] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);

  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentReturnInvoiceItems, setCurrentReturnInvoiceItems] = useState([]);
  const [returnToEdit, setReturnToEdit] = useState(null);
  const [editingReturnId, setEditingReturnId] = useState(null); // new state

  const returnInvoiceRef = useRef();
  const navigate = useNavigate();

  const indexOfLastReturn = currentPage * returnsPerPage;
  const indexOfFirstReturn = indexOfLastReturn - returnsPerPage;
  const currentReturns = returns.slice(indexOfFirstReturn, indexOfLastReturn);
  const totalPages = Math.ceil(returns.length / returnsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setShowShopsModal(false);
    setShowItemsModal(true);
  };

  const handleItemSelect = (item) => {
    const exists = selectedItems.find(i => i.item === item.item);
    if (!exists) {
      setSelectedItems([...selectedItems, { ...item, returnQty: 1 }]);
    }
  };

  const updateItemQuantity = (itemName, newQty) => {
    setSelectedItems(selectedItems.map(item =>
      item.item === itemName ? { ...item, returnQty: parseInt(newQty) || 0 } : item
    ));
  };

  const removeSelectedItem = (itemName) => {
    setSelectedItems(selectedItems.filter(item => item.item !== itemName));
  };

  const handleConfirmReturn = () => {
    if (editingReturnId !== null) {
      const updatedReturns = returns.map(rtn =>
        rtn.id === editingReturnId
          ? {
              ...rtn,
              shop: selectedShop.shopName,
              date: new Date().toLocaleDateString(),
              items: selectedItems.filter(item => item.returnQty > 0),
            }
          : rtn
      );
      const updatedReturn = updatedReturns.find(r => r.id === editingReturnId);
      setReturns(updatedReturns);
      setReturnToEdit(updatedReturn);
      setCurrentReturnInvoiceItems(updatedReturn.items);
      setEditingReturnId(null);
    } else {
      const newReturn = {
        id: returns.length + 1,
        type: returnType,
        shop: selectedShop.shopName,
        date: new Date().toLocaleDateString(),
        repName: 'Raheem',
        items: selectedItems.filter(item => item.returnQty > 0),
      };
      setReturns([...returns, newReturn]);
      setReturnToEdit(newReturn);
      setCurrentReturnInvoiceItems(newReturn.items);
    }
    setShowItemsModal(false);
    setSelectedShop(null);
    setSelectedItems([]);
  };

  const handleCancelReturn = () => {
    if (editingReturnId !== null) {
      // Show the Return to Edit modal if updating
      const originalReturn = returns.find(rtn => rtn.id === editingReturnId);
      setReturnToEdit(originalReturn); // Show confirmed Return
      setEditingReturnId(null);
      setShowItemsModal(false); // Close items modal
    } else {
      // Navigate to the initial Returns page when adding a new return
      navigate('/returns');
      setShowItemsModal(false);
      setSelectedShop(null);
      setSelectedItems([]);
    }
  };

  const handleGenerateReturnInvoice = () => {
    setShowPopup(true);
  };

  const handleEditReturn = () => {
    if (returnToEdit) {
      const originalReturn = returnToEdit;
      setSelectedShop({ shopName: originalReturn.shop });
      setSelectedItems(originalReturn.items);
      setEditingReturnId(originalReturn.id); // set edit mode
      setReturnToEdit(null);
      setShowItemsModal(true);
    }
  };

  const handlePrint = () => {
    html2canvas(returnInvoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("Return Invoice.pdf");
    });
  };

  const handleDelete = (id) => {
    const updatedReturns = returns.filter(rtn => rtn.id !== id);
    setReturns(updatedReturns);
  };  

  return (
    <div className='Returns'>
      <Sidebar/>
      <div className='ReturnsContainer'>
        <AdminNavbar/>
        <div className='returns-title'>
         <h1>Returns</h1>
        </div>
        <div className='btn-re1'>
          <button className='good-btn' onClick={() => { setReturnType('Good'); setShowShopsModal(true); }}>Add Good Return</button>
        </div>
        <div className='btn--re2'>
          <button className='bad-btn' onClick={() => { setReturnType('Bad'); setShowShopsModal(true); }}>Add Bad Return</button>
        </div>


        <div className="returns-table-container">
          <table className="returns-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Shop</th>
                <th>Date</th>
                <th>Rep Name</th>
                <th>Items</th>
                <th className="text-center" colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentReturns.map(rtn => (
                <tr key={rtn.id}>
                  <td>{rtn.type}</td>
                  <td>{rtn.shop}</td>
                  <td>{rtn.date}</td>
                  <td>{rtn.repName}</td>
                  <td>{rtn.items ? rtn.items.map(i => `${i.item} (${i.returnQty})`).join(', ') : '—'}</td>
                   <td>
                    {" "}
                    <button
                      className="btn view-btn"
                      onClick={() => handleViewReturns(rtn)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button className="dlt-btn" onClick={() => handleDelete(rtn.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="pagination-container-returns">
            <button 
              className="pagination-arrow-returns" 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
                
            {[...Array(totalPages).keys()].slice(0, 5).map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`pagination-number-returns ${currentPage === number + 1 ? 'active' : ''}`}
              >
                {number + 1}
              </button>
            ))}
                
            {totalPages > 5 && <button className="pagination-ellipsis-returns">...</button>}
                
              {totalPages > 5 && (
                <button 
                  className="pagination-number-returns"
                  onClick={() => paginate(totalPages)}
                >
                  {totalPages}
                </button>
              )}
                
              <button 
                className="pagination-arrow-returns" 
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
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
                  <div key={index} className="ShopCard" onClick={() => handleShopSelect(shop)}>
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
              <button className="CancelButton" onClick={() => setShowShopsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    {/* View Order Popup */}
    {viewingReturns && (
          <div className="ModalBackdrop">
            <div className="Modal">
              <h2>Return Details</h2>
              <div className="ScrollableContent"> {/* Add this wrapper */}
                <div className="orderdetails">
                  <div className='orderdetails1'>
                    <div className='type'>
                      <p><strong>Type:</strong>{viewingReturns.type}</p>
                    </div>
                    <p><strong>Date:</strong> {viewingReturns.date}</p>
                    <div className='repname'>
                      <p><strong>Rep Name:</strong> {viewingReturns.repName}</p>
                    </div>
                    
                  </div>
                  <div className='orderdetails2'>
                    <p><strong>Shop Name:</strong> {viewingReturns.shop}</p>
                    <p><strong>Total Amount:</strong> Rs. {viewingReturns.items.reduce((total, item) => total + (item.returnQty * parseFloat(item.unitPrice)), 0).toFixed(2)}</p>
                  </div>
                </div>
                <table className="customtable">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewingReturns.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item}</td>
                        <td>{item.returnQty}</td>
                        <td>{(item.returnQty * parseFloat(item.unitPrice)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="Action">
                <button onClick={() => setViewingReturns(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

      {/* Items Modal */}
      {showItemsModal && (
        <div className="ModalBackdrop">
          <div className="Modal">
            <h2>Select Return Items for {selectedShop?.shopName}</h2>
            <div className="ScrollableContent">
              <div className="DistributionStockGrid">
                {items.map((item, index) => {
                  const selected = selectedItems.find(i => i.item === item.item);
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
                                value={selected.returnQty}
                                onChange={(e) => updateItemQuantity(item.item, e.target.value)}
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
                            <button className="SelectItemBtn" onClick={() => handleItemSelect(item)}>Select</button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ModalButtons">
              <button className="CancelButton" onClick={handleCancelReturn}>Cancel</button>
              <button className="ConfirmButton" onClick={handleConfirmReturn}>
                {editingReturnId ? 'Update Return' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed Return View */}
      {returnToEdit && (
        <div className="ModalBackdrop">
          <div className='Modal'>
            <h2>Return</h2>
            <div className='ScrollableContent'>
                <table className="confirmedReturnTable">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnToEdit.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item}</td>
                        <td>{item.returnQty}</td>
                        <td>{item.unitPrice}</td>
                        <td>{item.returnQty * item.unitPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className='Action'>
              <button onClick={handleEditReturn}>Edit Return</button>
              <button onClick={handleGenerateReturnInvoice}>Generate Return Invoice</button>
              <button onClick={() => setReturnToEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Return Invoice Popup */}
      {showPopup && (
        <div className="ModalBackdrop">
          <div className='Modal'>
            <div className="invoice-content" ref={returnInvoiceRef}>
              <div className="invoice-header">
                <img src={logo} alt="Invoice Logo" className="invoice-logo" />
                <div>
                  <h2>{returnToEdit?.shop}</h2>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <div className="invoice-number">
                  <h2>Return Invoice</h2>
                  <p>Return ID</p>
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
                  {currentReturnInvoiceItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.item}</td>
                      <td>{item.returnQty}</td>
                      <td>Rs. {item.unitPrice}</td>
                      <td>Rs. {item.returnQty * item.unitPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="invoice-total">
                <p>Sub Total: Rs. 150,000</p>
              </div>
            </div>
            <div className="invoice-buttons">
              <button className="print-btn" onClick={handlePrint}>Print</button>
              <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Returns;