import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import Login from './Pages/Login/AdminLogin/login.jsx'; // Import the AdminLogin component
import RepLogin from './Pages/Login/RepLogin/RepLogin.jsx'; // Import the RepLogin component
import RepRegistration from './Pages/RepRegistration/RepRegistration.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/replogin" element={<RepLogin />} />
          <Route path="/repredistration" element={<RepRegistration/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
