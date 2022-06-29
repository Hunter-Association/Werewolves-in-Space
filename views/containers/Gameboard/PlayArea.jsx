import React, { useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { GlobalContext } from '../../store';
// import MusicPlayer from './components/musicPlayer';
// import socket from '../../util/socket.config.js';
// import all of the images
import Styled from 'styled-components';
import playAreaBG from '../../../Assets/img/playAreaBG.gif';
import { GlobalContext } from '../../store';
import {
  runPlayerRound,
  endPlayerRound,
  runWolfRound,
  endWolfRound,
  suspectHandler,
  lockHandler,
  ejectHandler,
  eatHandler,
  clearData,
  suspect,
  lockIn,
} from './GameboardUtilities';
import socket from '../../util/socket.config';
import wolfImage from '../../../Assets/WhiteReady.png';

// build a reference object/array
// this should contain links to all the images/

const PlayArea = () => {
  const { player, players, characterList } = useContext(GlobalContext);
  console.log(characterList);
  useEffect(() => {
    socket.on('suspect', suspectHandler);
    socket.on('lockIn', lockHandler);
    socket.on('ejectViaAirLock', ejectHandler);
    socket.on('eatPlayer', eatHandler);
    // socket.on('player-disconnected',);
    // socket.on('chat-message', );
    if (player.isHost) {
      runPlayerRound();
    }
  }, []);

  console.log(characterList);

  const getModel = function (pID, pNum) {
    if (pNum === 1) {
      return <Player1 src={wolfImage} key={pID} num={pNum} />;
    }
  };

  return (

    <PositioningDiv className="positioningDiv">
      <img src={playAreaBG} alt="A spooky scary background on a spaceship!" />
      {players.map((p, i) => getModel(p.id, i + 1))}
    </PositioningDiv>

  );
};

const PositioningDiv = Styled.div`
position: relative;
width: fit-content;
height: fit-content;

`;
const Player1 = Styled.img`
  position: absolute;
  top: 65%;
  left: 10%;
`;

const Player2 = Styled.img`
  position: absolute;
  top: 80%;
  left: 20%;
`;

const Player3 = Styled.img`
  position: absolute;
  top: 65%;
  left: 30%;
`;

const Player4 = Styled.img`
position: absolute;
top: 80%;
left: 40%;
`;

const Player5 = Styled.img`
position: absolute;
top: 65%;
left: 50%;
`;

const Player6 = Styled.img`
position: absolute;
top: 80%;
left: 60%;
`;

const Player7 = Styled.img`
position: absolute;
top: 65%;
left: 70%;
`;

const Player8 = Styled.img`
position: absolute;
top: 80%;
left: 80%;
`;

// const PlayerContainer = Styled.div`
//   position: absolute;
//   margin: 20%;
// `;

export default PlayArea;
