import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../store';
import List from './List';
import socket from '../../util/socket.config';

const Lobby = () => {
  const {
    players, setPlayers, player, gameID,
  } = useContext(GlobalContext);
  useEffect(() => {
    socket.on('ready', (user) => {
      setPlayers((prev) => {
        prev.map((current) => {
          if (current.username === user.username) {
            return { ...current, status: true };
          }
          return current;
        });
      });
    });
    socket.on('start', () => {
      <Board />
    });
  }, []);

  const readyUp = () => {
    socket.emit('ready', player, gameID);
  };
  const startGame = () => {
    socket.emit('start', player, gameID);
  };

  return (
    <>
      <List
        players={players}
      />
      <button onClick={readyUp} type="submit">READY UP!</button>
      {isHost ? <button onClick={startGame} type="submit">START GAME</button> : null}
    </>
  );
};

export default Lobby;
