import React from 'react';
import axios from "axios";
import './css/App.css';
import { AuthContextProvider } from './context/AuthContextProvider';
import MainRouter from './MainRouter';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
        <MainRouter />
    </AuthContextProvider>
  );
}

export default App;