import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Login from './Pages/Login/AdminLogin/login.jsx'; // Import the AdminLogin component
import RepLogin from './Pages/Login/RepLogin/RepLogin.jsx'; // Import the RepLogin component
import RepRegistration from './Pages/RepRegistration/RepRegistration.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Orders from './Pages/Orders/Orders.jsx'; // Import the Orders component

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/replogin" element={<RepLogin />} />
          <Route path="/repredistration" element={<RepRegistration/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
