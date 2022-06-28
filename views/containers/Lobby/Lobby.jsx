import React, { useContext, useState, useEffect } from 'react';
import Styled from 'styled-components';
import { GlobalContext, GlobalProvider } from '../../store';
import socket from '../../util/socket.config';
// import { Button } from '../../library';

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
    <Background>
      <Title>LOADING BAY</Title>
      <Row>
        <Column>
          { players.map((each) => (
            <PlayerRow>
              <PlayerName key={each.id}>{each.username.slice(0, 20)}</PlayerName>
              <PlayerSelection color={each.color}>O</PlayerSelection>
            </PlayerRow>
          ))}
        </Column>

        <Column>
          <Placeholder />
          <LoadingButton onClick={readyUp} color="green" type="button">IM READY!</LoadingButton>
        </Column>
      </Row>
      <Row>
        <Column>
          <div>Room Code</div>
          <LoadingButton color="grey" onClick={startGame} type="button">HKFAJ</LoadingButton>
        </Column>
        {player.isHost ? <LoadingButton color="red" onClick={startGame} type="button">START GAME</LoadingButton> : null}
      </Row>
    </Background>
  )
};

const Background = Styled.div`
  display: flex;
  flex-direction: column;
  background: #181818;
  height: 100vh;
  align-items: center;
`;

const Title = Styled.div`
  font-family: anotherDanger;
  color: red;
  font-size: 10vh;
`;

const PlayerRow = Styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: #232323;
  margin-bottom: 5px;
  width: 25rem;

`;

const Column = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = Styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  padding-top: 5vh;
`;

const LoadingButton = Styled.button`
  background-color: #232323;
  color:  ${(props) => props.color || '#E0E0E0'};
  font-size: 24px;
  border: none;
  box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
  width: 15rem;
`;

const Placeholder = Styled.div`
  height: 35vh;
  width: 25rem;
  border: 2px solid red;
`;

const PlayerName = Styled.div`
  font-size: 2rem;
`;

const PlayerSelection = Styled.div`
  font-size: 2rem;
  color: ${(props) => props.color || 'white'},
  border-radius: 50%,
  border: 3px solid grey,
  width: 10px,
  height: 10px
`;
export default Lobby;
