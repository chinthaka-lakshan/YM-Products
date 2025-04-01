import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Login from './Pages/Login/AdminLogin/login.jsx';
import RepLogin from './Pages/Login/RepLogin/RepLogin.jsx';
import RepRegistration from './Pages/RepRegistration/RepRegistration.jsx';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/AdminDashboard.jsx';
import Orders from './Pages/Orders/Orders.jsx';
import RepDashboard from './Pages/Dashboard/RepDashboard/RepDashboard.jsx';
import Invoice from "./Pages/Invoice/Invoice.jsx"
import OrdersHistory from './Pages/OrdersHistory/OrdersHistory.jsx'
import Returns from './Pages/Returns/Returns.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admindashboard" element={<AdminDashboard/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/replogin" element={<RepLogin />} />
          <Route path="/repredistration" element={<RepRegistration/>} />
          <Route path="/repdashboard" element={<RepDashboard/>} />
          <Route path="/repregistration" element={<RepRegistration/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/ordersHistory" element={<OrdersHistory/>} />
          <Route path="/returns" element={<Returns/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
