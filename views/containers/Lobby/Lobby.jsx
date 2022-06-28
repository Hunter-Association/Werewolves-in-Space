import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext, GlobalProvider } from '../../store';
import socket from '../../util/socket.config';
import { Column, Center, Row, CharacterColor } from '../../library';

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

  return (
    <Column justify-content="center" align-items="center">
      <div style={{ color: 'red' }}>GAME LOBBY</div>
      <Row>
        <Column style={{ color: 'red', backgroundColor: 'black' }}>
          <div>
            {players.map((each) => (
              <Row>
                <div key={each.id}>{ each.username }</div>
                {each.status ? <div style={{ backgroundColor: 'green', color: 'white' }}> READY! </div> : <div style={{ backgroundColor: 'red', color: 'white' }}> CHOOSING </div>}
                <div style={{ margin: '10px', backgroundColor: `${each.color}`, border: '3px solid black', borderRadius: '50%', height: '20px', width: '20px' }} />
              </Row>
            ))}
            <button onClick={readyUp} type="button">READY UP!</button>
            {player.isHost ? <button onClick={startGame} type="button">START GAME</button> : null}
          </div>
        </Column>
      </Row>
    </Column>
  );
};

export default Lobby;
