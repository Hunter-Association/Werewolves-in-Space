import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { GlobalContext } from '../../store';
import MusicPlayer from './components/musicPlayer';
import socket from '../../util/socket.config';
import PlayArea from './PlayArea';
import Chat from '../Chat/index';
import GameInfo from './components/gameInfo';

const Gameboard = () => {
  const {
    user, players, setUser, setPlayers,
  } = useContext(GlobalContext);
  const borderStyle = {
    border: '8px solid red',
  };

  const [infoModal, setInfoModal] = useState(false);

  useEffect(() => {
    document.getElementById('gameMusic').volume = 0.1;
  }, []);
  return (
    <MainDiv>
      <HeaderDiv>
        {/* nav bar */}
        <p>Welcome to the board.</p>
        <button type="button" onClick={() => setInfoModal(!infoModal)}>Info</button>
        {infoModal ? <GameInfo /> : null}
        {/* <Link to="/">
          <div>Back to home</div>
        </Link> */}
        <MusicPlayer />
      </HeaderDiv>
      <BottomDiv>
        <PlayAreaDiv>
          <PlayArea>playArea</PlayArea>

        </PlayAreaDiv>
        <ChatAreaDiv>
          <ChatBufferDiv />
          <Chat height="fit-content" />
          <ChatBufferDiv />
        </ChatAreaDiv>

      </BottomDiv>
    </MainDiv>

  );
};

export default Gameboard;

const baseDiv = Styled.div`
  height: 100vh;
  overflow: hidden;
`;

const ChatBufferDiv = Styled.div`
  height: 10%;
`;

const HeaderDiv = Styled(baseDiv)`
display: flex;
flex-direction: row;
justify-content: center;
background: #181818;
height: 20%;
width: 100%;
align-items: center;`;

const MainDiv = Styled.div`
  display: flex;
  flex-direction: column;
  background: #181818;
  // height: 100vh;
  min-width: 1000px;
  align-items: center;
`;

const BottomDiv = Styled(baseDiv)`
  display: flex;
  gap: 20px;
  flex-direction: row;
  min-height: 470px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const GameAndChatDiv = Styled.div`
  height: min-content;
`;

const PlayAreaDiv = Styled(baseDiv)`
  height: fit-content;
  display: relative;
  `;

const ChatAreaDiv = Styled.div`

`;
