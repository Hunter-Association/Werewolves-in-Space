import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GlobalProvider } from '../store';
import Home from './Home';
import Login from './Login';

const App = () => (
  <GlobalProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </GlobalProvider>
);

export default App;
