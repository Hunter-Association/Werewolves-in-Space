import React from 'react';
import { Link } from 'react-router-dom';
import Lobby from './Lobby.jsx';

const LobbyList = () => (
  <Link to="/lobby">
    <Lobby />
  </Link>

);

export default LobbyList;
