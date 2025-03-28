import { useState } from 'react'
import './App.css'
import Login from './Pages/Login/login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login/>
    </div>
  )
}

export default App
