import React from "react";
import "./Invoice.css";
import Sidebar from "../../components/Sidebar/AdminSidebar/AdminSidebar";
import TopBar from "../../components/Topbar/topbar";

const RepInvoice = () => {
  const items = [
    { item: "Chili Powder", weight: 50, qty: 20, unitPrice: 250 },
    { item: "Chili Powder", weight: 100, qty: 20, unitPrice: 300 },
    { item: "Chili Powder", weight: 250, qty: 20, unitPrice: 450 },
    { item: "Chili Powder", weight: 500, qty: 20, unitPrice: 600 },
  ];

  return (
    <div className="invoice-container">
    <Sidebar/>
    <TopBar/>
      <h2 className="invoice-title">Invoice</h2>
      <div className="invoice-table">
        <table>
          <thead>
            <tr>
              <th className="table-header">Item</th>
              <th className="table-header">Weight</th>
              <th className="table-header">QTY</th>
              <th className="table-header">Unit Price</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                <td className="table-text">{item.item}</td>
                <td className="table-text">{item.weight}</td>
                <td className="table-text">{item.qty}</td>
                <td className="table-text">{item.unitPrice}</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="invoice-actions">
        <button className="add-btn">Add Items</button>
        <button className="generate-btn">Generate Invoice</button>
      </div>
    </div>
  );
};

export default RepInvoice;
