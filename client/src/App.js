import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import ClimbingRoutes from './pages/Routes/Routes';
import ClimbingRoute from './pages/Route/Route';
import Ascents from './pages/Ascents/Ascents';
import Ascent from './pages/Ascent/Ascent';
import NewAscent from './pages/NewAscent/NewAscent';


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/routes/:id" exact element={<ClimbingRoute />} />
        <Route path="/routes" exact element={<ClimbingRoutes />} />
        <Route path="/ascents/new" exact element={<NewAscent />} />
        <Route path="/ascents/:id" exact element={<Ascent />} />
        <Route path="/ascents" exact element={<Ascents />} />
      </Routes>
    </Router>
  )
}
