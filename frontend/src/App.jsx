
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Login from './Pages/Login/AdminLogin/login.jsx';
import RepLogin from './Pages/Login/RepLogin/RepLogin.jsx';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard.jsx';
import DistributionStock from './Pages/DistributionStock/DistributionStock.jsx';
import PurchaseStock from './Pages/PurchaseStock/PurchaseStock.jsx';
import Orders from './Pages/Orders/Orders.jsx';
import AdminShops from './Pages/AdminShops/AdminShops.jsx';
import RepRegistration from './Pages/RepRegistration/RepRegistration.jsx';
import RepDashboard from './Pages/Dashboard/RepDashboard/RepDashboard.jsx';
import Invoice from "./Pages/Invoice/Invoice.jsx"
import OrdersHistory from './Pages/OrdersHistory/OrdersHistory.jsx'
import Returns from './Pages/Returns/Returns.jsx';
import CashFlowAnalysis from './Pages/CashFlowAnalysis/CashFlowAnalysis.jsx';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/AdminLogin/login.jsx";
import RepLogin from "./Pages/Login/RepLogin/RepLogin.jsx";
import RepRegistration from "./Pages/RepRegistration/RepRegistration.jsx";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import RepDashboard from "./Pages/Dashboard/RepDashboard/RepDashboard.jsx";
import Invoice from "./Pages/Invoice/Invoice.jsx";
import OrdersHistory from "./Pages/OrdersHistory/OrdersHistory.jsx";
import DistributionStock from "./Pages/DistributionStock/DistributionStock.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/distributionStock" element={<DistributionStock/>}/>
          <Route path="/purchaseStock" element={<PurchaseStock/>}/>
          <Route path="/adminOrders" element={<Orders/>}/>
          <Route path="/adminShops" element={<AdminShops/>}/>
          <Route path="/salesReps" element={<RepRegistration/>}/>

          <Route path="/repLogin" element={<RepLogin />}/>
          <Route path="/" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/distributionstock" element={<DistributionStock />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/replogin" element={<RepLogin />} />
          <Route path="/repredistration" element={<RepRegistration/>} />
          <Route path="/repdashboard" element={<RepDashboard/>} />
          <Route path="/repregistration" element={<RepRegistration/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/ordersHistory" element={<OrdersHistory/>} />
          <Route path="/returns" element={<Returns/>} />
          <Route path="/cash-flow" element={<CashFlowAnalysis/>} />
          <Route path="/repredistration" element={<RepRegistration />} />
          <Route path="/repdashboard" element={<RepDashboard />} />
          <Route path="/repregistration" element={<RepRegistration />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/ordersHistory" element={<OrdersHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;