import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalProvider } from '../store';
import Home from './Home';
import Login from './Login';
import Gameboard from './Gameboard';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/board" element={<Gameboard />} />
    </Routes>
  </GlobalProvider>
);

export default App;
