import { useState } from 'react'
import { Home } from '../pages/Home'
import { Landing } from '../pages/Landing'
import { Layout } from '../components/Layout'
import { Profile } from '../pages/Profile'
import { UserAvailability } from '../pages/UserAvailability'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/availability" element={<UserAvailability/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
