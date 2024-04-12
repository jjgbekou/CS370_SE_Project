import { useState } from 'react'
import { Home } from './pages/Home'
import { Landing } from './pages/Landing'
import { Layout } from './components/Layout'
import { Profile } from './pages/Profile'
import { UserAvailability } from './pages/UserAvailability'
import { UserList } from './pages/UserList'
import { Manager } from './pages/Manager'
import { MySchedule } from './pages/MySchedule'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/availability" element={<UserAvailability/>}/>
          <Route path="/userlist" element={<UserList/>}/>
          <Route path="/manager" element={<Manager/>}/>
          <Route path="/myschedule/:id" element={<MySchedule/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
