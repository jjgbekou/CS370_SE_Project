import { useState } from 'react'
import { Home } from '../pages/Home'
import { Landing } from '../pages/Landing'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App
