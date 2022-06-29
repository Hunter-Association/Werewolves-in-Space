import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { GlobalContext } from '../../store';
import MusicPlayer from './components/musicPlayer';
import socket from '../../util/socket.config';
import PlayArea from './PlayArea';
import Chat from '../Chat/index';
import './player.css';
const Gameboard = () => {
  const {
    user, players, setUser, setPlayers,
  } = useContext(GlobalContext);
  const borderStyle = {
    border: '8px solid red',
  };

  useEffect(() => {
    document.getElementById('gameMusic').volume = 0.1;
  }, []);
  return (
    <MainDiv>
      <HeaderDiv>
        {/* nav bar */}
        <p style={{'font-size':'100px'}}>Space Werewolves</p>
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

          <Chat />

        </ChatAreaDiv>

      </BottomDiv>
    </MainDiv>

  );
};

export default Gameboard;

const baseDiv = Styled.div`
  height: 100vh;
  width: 100vh;
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
  height: 100vh;
  min-width: 1000px;
  align-items: center;
`;

const BottomDiv = Styled(baseDiv)`
  display: flex;
  gap: 20px;
  flex-direction: row;
  min-height: 470px;
  width: 100%;
  justify-content: space-evenly;
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
  height: 100%;
`;
