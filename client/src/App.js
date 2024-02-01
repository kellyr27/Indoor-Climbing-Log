import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </Router>
  )
}
