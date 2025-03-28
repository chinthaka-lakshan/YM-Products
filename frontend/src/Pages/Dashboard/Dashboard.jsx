import React from "react";
import "./dashboard.css"; // Ensure proper styles
import order from "../../assets/orders.png"; 
import rep from "../../assets/rep.png";
import stock from "../../assets/stock.png";
import Sidebar from "../../components/Sidebar/Sidebar.jsx"; // Import Sidebar component

const Dashboard = () => {
  const orders = [
    { shop: "Shop", date: "3/4/2025", rep: "Roshen" },
    { shop: "Shop", date: "3/4/2025", rep: "Roshen" },
    { shop: "Shop", date: "3/4/2025", rep: "Roshen" },
    { shop: "Shop", date: "3/4/2025", rep: "Roshen" },
  ];

  return (
    <div className="container">
        <Sidebar />
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to YM Products</h1>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6 ">
        <div className="card">
          <img src={order} alt="Orders" className="icon" />
          <span>Orders</span>
        </div>
        <div className="card">
          <img src={rep} alt="Rep" className="icon" />
          <span>Rep</span>
        </div>
        <div className="card">
          <img src={stock} alt="Stock" className="icon" />
          <span>D_Stock</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-2 text-left">Shop</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Rep Name</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{order.shop}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.rep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
