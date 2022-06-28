import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext, GlobalProvider } from '../../store';
import socket from '../../util/socket.config';

const Lobby = () => {
  const {
    players, setPlayers, player, gameID, allPlayers,
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
    // socket.on('start', () => 'add board component here');
    // });
  }, []);

  const readyUp = () => {
    socket.emit('ready', player, gameID);
  };
  const startGame = () => {
    socket.emit('start', player, gameID);
  };
  // const makeList = players.map((each) => (
  //   <div>{each.username}</div>
  // ));

  return (
    <div>
      { players.map((each) => (
        <>
          <div key={each.id}>{each.username}</div>
          <div>{each.color}</div>
        </>
      ))}
      <button onClick={readyUp} type="button">READY UP!</button>
      {player.isHost ? <button onClick={startGame} type="button">START GAME</button> : null}
    </div>
  );
};

export default Lobby;
