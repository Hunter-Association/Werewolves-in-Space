import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalProvider } from '../store';
import Home from './Home';
import Login from './Login';
import Lobby from './Lobby';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </GlobalProvider>
);

export default App;
