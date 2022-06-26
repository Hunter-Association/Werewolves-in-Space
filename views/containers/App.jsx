import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

const App = () => (
  <Routes>
    <Route path="/" element={<Chat />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default App;
