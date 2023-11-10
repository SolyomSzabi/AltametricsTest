import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Bills from './pages/Bills'
import Invoices from './pages/Invoices'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/bills' element={<Bills />} />
        <Route path='/invoices' element={<Invoices />} />
      </Routes>
    </Router>
  )
}

export default App
