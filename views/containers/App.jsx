import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalProvider } from '../store';
import Home from './Home';
import Login from './Login';
import Signup from './Login/Signup';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </GlobalProvider>
);

export default App;
