import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { GlobalContext } from '../../store';
import socket from '../../util/socket.config';
import CrewManifest from '../../../Assets/CrewManifest.png';
import LobbyChat from './LobbyChat';
import arrowDown from '../../../Assets/arrow-down.svg';
import arrowUp from '../../../Assets/arrow-up.svg';
// import Chat from '../Chat';
import CharacterSelect from './CharacterSelect';

const Lobby = () => {
  const {
    players, setPlayers, player, gameID,
  } = useContext(GlobalContext);

  const [showChat, setShowChat] = useState(false);

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

  const handleChatShow = () => {
    setShowChat((prev) => !prev);
  };

  const arrow = arrowUp;

  return (
    <Background>
      <Title>LOADING BAY</Title>
      <Row>
        <LeftColumn>
          <Img src={CrewManifest} alt="crew-manifest" />
          <ListCol>
            { players.map((each) => (
              <PlayerRow>
                <PlayerName key={each.id}>{each.username.slice(0, 10)}</PlayerName>
                <PlayerSelection>{each.color}</PlayerSelection>
              </PlayerRow>
            ))}
          </ListCol>
          <Column>
            <CodeDiv>Room Code</CodeDiv>
            <LoadingButton color="grey" onClick={() => copy(gameID)} type="button">{gameID}</LoadingButton>
          </Column>
        </LeftColumn>

        <Column>
          <CharacterSelect />
          <LoadingButton onClick={readyUp} color="green" type="button">IM READY!</LoadingButton>
        </Column>

      </Row>

      <Row>
        {player.isHost ? <LoadingButton color="red" onClick={startGame} type="button">START GAME</LoadingButton> : null}
      </Row>

      <ChatDiv>
        {showChat && <LobbyChat />}
        <ChatExpandCont>
          <ChatText>Chat</ChatText>
          <ArrowDiv onClick={handleChatShow}>
            {showChat ? <img src={arrowDown} alt="arrow" /> : <img src={arrowUp} alt="arrow" /> }
          </ArrowDiv>
        </ChatExpandCont>
      </ChatDiv>
    </Background>

  // <div>
  // { players.map((each) => (
  //   <>
  //     <div key={each.id}>{each.username}</div>
  //     <div>{each.color}</div>
  //   </>
  // ))}
  //   <button onClick={readyUp} type="button">READY UP!</button>
  //   {player.isHost ? <button onClick={startGame} type="button">START GAME</button> : null}
  // </div>
  );
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
  background-color: 'black';
  margin-bottom: 5px;
  width: 20rem;
  z-index: 100;
`;

const CodeDiv = Styled.div`
  z-index: 75;
  margin-bottom: 1.7em;

`;

const Column = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListCol = Styled(Column)`
  margin-top: 5.5em;
  background-color: black;
  z-index: 50;
`;

const LeftColumn = Styled(Column)`
  position: relative;
  width: 30rem;
  height: 100%;
`;

const Img = Styled.img`
  position: absolute;
  width: 100%;
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
  z-index: 75;
`;

const Placeholder = Styled.div`
  height: 50vh;
  width: 25rem;
  border: 2px solid red;
`;

const PlayerName = Styled.div`
  font-size: 2rem;
  letter-spacing: 4px;
`;

const PlayerSelection = Styled.div`
  font-size: 2rem;
`;

const ChatDiv = Styled.div`
  display: flex;
  flex-direction: column;
  height: 23.5em;
  width: 22.2em;
  position: fixed;
  bottom: 1rem;
  right: 2em;
  z-index: 500;
`;

const ChatExpandCont = Styled.div`
  display: flex;
  height: 3em;
  width: 21.9em;
  background-color: black;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 1rem;
`;

const ChatText = Styled.div`
  letter-spacing: 4px;
  color: white;
  flex-grow: 3;
  padding-left: 1em;
`;

const ArrowDiv = Styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  padding-right: 1em;
  align-items: center;
`;

export default Lobby;
