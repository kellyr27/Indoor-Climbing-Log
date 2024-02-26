import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyAppBar from './components/MyAppBar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <Router>
      <MyAppBar />
      <AppRoutes />
    </Router>
  );
}