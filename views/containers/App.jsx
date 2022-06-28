import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Login/Signup';
import Lobby from './Lobby/Lobby';
import { GlobalProvider } from '../store';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Lobby />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  </GlobalProvider>
);

export default App;
