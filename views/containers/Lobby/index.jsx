import React from 'react';
import { Link } from 'react-router-dom';
import Start from './Start';

const Lobby = () => (
  <Link to="/lobby">
    <Start />
  </Link>

);

export default Lobby;
