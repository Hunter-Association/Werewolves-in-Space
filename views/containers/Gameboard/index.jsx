import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { GlobalContext } from '../../store';
import MusicPlayer from './components/musicPlayer';
import socket from '../../util/socket.config.js';
import PlayArea from './PlayArea.jsx';
import Chat from '../Chat/index.jsx';
import silence from '../../../assets/music/silence.mp3';

const Gameboard = (props) => {
  console.log(props);
  useEffect(() => {
    document.getElementById('gameMusic').volume = 0.1;
  //   // socket.on('suspect', suspectHandler)
  //   // socket.on('lockIn', lockHandler)
  //   // socket.on('ejectViaAirLock', ejectHandler)
  //   // socket.on('eatPlayer', eatHandler)
  //   // socket.on('player-disconnected',)
  //   // socket.on('chat-message', )
  }, [])
  const {
    user, players, setUser, setPlayers,
  } = useContext(GlobalContext);
  const borderStyle = {
    border: '8px solid red',
  };



  return (
    <MainDiv>
      <HeaderDiv>
        {/* nav bar */}
        <p>Welcome to the board.</p>
        <Link to="/">
          <div>Back to home</div>
        </Link>
        {/* <MusicPlayer id="gameMusic" /> */}
      </HeaderDiv>
      <BottomDiv>
        <PlayAreaDiv>
          <PlayArea></PlayArea>
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
`;

const ChatBufferDiv = Styled.div`
  height: 30%;
`;

const HeaderDiv = Styled(baseDiv)`
display: flex;
flex-direction: row;
justify-content: space-between;
background: #181818;
height: 20%;
width: 100%;
align-items: center;`;

const MainDiv = Styled.div`
  display: flex;
  flex-direction: column;
  background: #181818;
  height: 100vh;
  min-width: 1000px;
  align-items: center;
`;

const BottomDiv = Styled(baseDiv)`
  display: flex;
  flex-direction: row;
  min-height: 470px;
  width: 100%;
  justify-content:center;
  align-items: center;
`;

const GameAndChatDiv = Styled.div`
  height: min-content;
`;

const PlayAreaDiv = Styled(baseDiv)`
  width: 70%;
  height: fit-content;
  display: relative;
  `;

const ChatAreaDiv = Styled.div`
  width: 30%;
  height: fit-content;
`;
