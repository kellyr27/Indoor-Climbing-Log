import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyAppBar from './components/MyAppBar';
import AppRoutes from './routes/AppRoutes';
import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MyAppBar />
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}