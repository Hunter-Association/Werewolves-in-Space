import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Gameboard from './Gameboard';
import Signup from './Login/Signup';
import { GlobalProvider } from '../store';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/board" element={<Gameboard />} />
    </Routes>
  </GlobalProvider>
);

export default App;
