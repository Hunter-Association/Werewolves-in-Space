import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext, GlobalProvider } from '../../store';
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
      console.log('add board component here');
    });
    socket.on('list', () => {
      players.map((each) => (
        <>
          <li>{each}</li>
          <div>{each.color}</div>
          <div>{each.status}</div>
        </>
      ));
    });
  }, []);

  const readyUp = () => {
    socket.emit('ready', player, gameID);
  };
  const startGame = () => {
    socket.emit('start', player, gameID);
  };

  const makeList = () => {
    socket.emit('list', players);
  };
  // const makeList = (players) => {
  //   players.map((player) => (
  //     <>
  //       <li>{player}</li>
  //       <div>{player.color}</div>
  //       <div>{player.status}</div>
  //     </>
  //   ));
  // };

  return (
    <>
      {makeList}
      <button onClick={readyUp} type="submit">READY UP!</button>
      {player.isHost ? <button onClick={startGame} type="submit">START GAME</button> : null}
    </>
  );
};

export default Lobby;
