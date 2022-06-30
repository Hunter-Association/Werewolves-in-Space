import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../store';
import socket from '../../util/socket.config';
import CrewManifest from '../../../Assets/CrewManifest.png';
import LobbyChat from './LobbyChat';
import arrowDown from '../../../Assets/arrow-down.svg';
import arrowUp from '../../../Assets/arrow-up.svg';
import CharacterSelect from './CharacterSelect';
import copyIcon from '../../../Assets/icons8-copy-48.png';

const Lobby = () => {
  const navigate = useNavigate();
  const {
    players, setPlayers, player, setPlayer, gameID,
  } = useContext(GlobalContext);

  const [currentCharacter, setCurrentCharacter] = useState(3);
  const [showChat, setShowChat] = useState(false);
  const [canStart, setCanStart] = useState(false);

  socket.on('ready', (user) => {
    const playList = players.map((current) => {
      if (current.username === user.username) {
        return { ...current, status: !current.status, charDex: currentCharacter };
      }
      return current;
    });
    setPlayers(playList);
    if (player.isHost) {
      setCanStart(playList.every((each) => each.status));
    }
  });
  socket.on('game-started', (playerss) => {
    setPlayers(playerss);
    navigate('/board');
  });

  // useEffect(() => {
  //   socket.on('ready', (user) => {
  //     const playList = players.map((current) => {
  //       console.log('playlist', playList);
  //       if (current.username === user.username) {
  //         return { ...current, status: !current.status };
  //       }
  //       return current;
  //     });
  //     setPlayers(playList);
  //     if (player.isHost) {
  //       setCanStart(playList.every((each) => each.status));
  //     }
  //   });
  //   socket.on('game-started', () => {
  //     navigate('/board');
  //   });
  // }, []);

  const readyUp = (p) => {
    console.log('inside ready up', p);
    socket.emit('ready', p, gameID);
  };
  const startGame = () => {
    socket.emit('start-game', gameID);
  };

  const getCharAndReady = () => {
    console.log('ok !!!!', currentCharacter);
    const playerWithCharDex = { ...player };
    playerWithCharDex.charDex = currentCharacter;
    readyUp(playerWithCharDex);
  };

  const handleChatShow = () => {
    setShowChat((prev) => !prev);
  };

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
                {each.status
                  ? <PlayerSelection color="green">Ready</PlayerSelection>
                  : <PlayerSelection color="red">Waiting</PlayerSelection> }
              </PlayerRow>
            ))}
          </ListCol>
          <Column>
            <CodeDiv>Room Code</CodeDiv>
            <TextRow onClick={() => copy(gameID)}>
              <LoadingButton1 color="grey" type="button">
                {gameID}
              </LoadingButton1>
              <IconImg src={copyIcon} />
            </TextRow>
          </Column>
        </LeftColumn>

        <Column>
          <CharacterSelect
            currentCharacter={currentCharacter}
            setCurrentCharacter={setCurrentCharacter}
          />
          <Row>
            {player.isHost && canStart ? <LoadingButton color="red" onClick={startGame} type="button">START GAME</LoadingButton> : null}
            <LoadingButton onClick={getCharAndReady} color="green" type="button">IM READY!</LoadingButton>
          </Row>
        </Column>

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

const IconImg = Styled.img`
  float: right;
  z-index: 1;
`;

const Row = Styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  padding-top: 5vh;
`;

const TextRow = Styled.div`
  display: flex;
  align-items: center;
  background-color: #232323;
  z-index: 1;
  border: none;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
  &:active {
    border: 2px green solid;
    color: green;
    box-shadow: none;
  }
`;

const LoadingButton1 = Styled.button`
  background-color: #232323;
  color:  ${(props) => props.color || '#E0E0E0'};
  font-size: 24px;
  font-family: Arial, Helvetica, sans-serif;
  border: none;
  width: 5rem;
  z-index: 9000;
`;

const LoadingButton = Styled.button`
  background-color: #232323;
  color:  ${(props) => props.color || '#E0E0E0'};
  font-size: 24px;
  border: none;
  box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
  width: 15rem;
  z-index: 9000;
  &:active {
    border: 2px green solid;
    color: green;
    box-shadow: none;
  }
`;

const PlayerName = Styled.div`
  font-size: 2rem;
  letter-spacing: 4px;
`;

const PlayerSelection = Styled.div`
  font-size: 2rem;
  color:  ${(props) => props.color};
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
