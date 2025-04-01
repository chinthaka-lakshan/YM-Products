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
        </Routes>
      </div>
    </Router>
  );
}

export default App;