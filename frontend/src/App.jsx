import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Login from '../src/Pages/Login/login.jsx';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard.jsx';
import RepDashboard from './Pages/RepDashboard/RepDashboard.jsx';
import ProtectedRoute from './Routes/ProtectedRoutes.jsx'; // Import the ProtectedRoute component


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> {/* Router should wrap Routes */}
      <div className="App">
        <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/rep-dashboard" element={<ProtectedRoute role="sales_rep"><RepDashboard /></ProtectedRoute>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
