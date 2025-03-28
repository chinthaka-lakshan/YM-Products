import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Login from '../src/Pages/Login/login.jsx';
import Sidebar from '../src/components/Sidebar/Sidebar.jsx'; 
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Orders from './Pages/Orders/Orders.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* Router should wrap Routes */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/dashboard" element={<Dashboard/>} /> {/* Assuming Sidebar is the main component for the dashboard */}
          <Route path='/orders' element={<Orders/>} /> {/* Assuming Sidebar is the main component for the orders */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
