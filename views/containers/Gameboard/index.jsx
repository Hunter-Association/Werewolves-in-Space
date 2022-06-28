import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../store';
import MusicPlayer from './components/musicPlayer';
import socket from '../../util/socket.config.js';

const Gameboard = (props) => {
  useEffect(() => {
    socket.on('ejectedViaAirLock');
    socket.on('werewolf-spotted');
    socket.on('murdered');
    socket.on('player-disconnected');
    socket.on('chat-message');
  }, []);

  const {
    user, players, setUser, setPlayers,
  } = useContext(GlobalContext);

  return (
    <div>
      <p>Welcome to the board.</p>
      <Link to="/">
        <div>Back to home</div>
      </Link>
      <MusicPlayer />
    </div>
  );
};

export default Gameboard;
