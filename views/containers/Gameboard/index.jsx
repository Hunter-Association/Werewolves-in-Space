import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../store';
import MusicPlayer from './components/musicPlayer';
import socket from '../../util/socket.config.js';

const Gameboard = (props) => {
  useEffect(() => {
<<<<<<< HEAD
    socket.on('suspect', suspectHandler)
    socket.on('lockIn', lockHandler)
    socket.on('ejectViaAirLock', ejectHandler)
    socket.on('eatPlayer', eatHandler)
    socket.on('player-disconnected',)
    socket.on('chat-message', )
  }, [])
=======
    socket.on('ejectedViaAirLock');
    socket.on('werewolf-spotted');
    socket.on('murdered');
    socket.on('player-disconnected');
    socket.on('chat-message');
  }, []);
>>>>>>> cc17bdfb3a081dc2a46862162ddfa9723e3a7868

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
