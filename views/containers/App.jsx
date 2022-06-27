import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalProvider } from '../store';
import Home from './Home';
import Login from './Login';
import Signup from './Login/Signup';
import Lobby from './Lobby';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  </GlobalProvider>
);

export default App;
