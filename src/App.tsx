import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppRoutes } from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return useAppRoutes()
}

export default App;
