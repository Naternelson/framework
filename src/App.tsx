import './App.css';
import AppRouterService from './2.0/router';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    console.log("YOP")
  })
  return <AppRouterService/>
}

export default App;
