import React, { useEffect, useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { GlobalContext } from '../../store';
// import MusicPlayer from './components/musicPlayer';
// import socket from '../../util/socket.config.js';
// import all of the images
import Styled from 'styled-components';
import playAreaBG from '../../../assets/img/playAreaBG.gif';
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
} from './GameboardUtilities.jsx';
import wolfImage from '../../../assets/WhiteReady.png';
import redWolf from '../../../assets/RedReady.png';
import playerWolf from '../../../assets/playerWolf.png';
// build a reference object/array
// this should contain links to all the images/

const PlayArea = (props) => {
  const { player, players, characterList } = useContext(GlobalContext);
  const filler = 'filled';
  const [numPlayers, setNumPlayers] = useState(0);
  console.log(dummyPlayers);

  const [dummyPlayers, setDummyPlayers] = useState([{
    username: 'realkllkdajldfdfakdjflksdsfd adlsd', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  },
  {
    username: 'user2', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  }, {
    username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: true,
  }, {
    username: 'user4', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  }, {
    username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  }, {
    username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  }, {
    username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  }, {
    username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
  }]);
  const handleClick = function (index) {
    const newList = [];
    const selfIndex = 0;
    console.log(player);
    if (index !== selfIndex) {
      for (let i = 0; i < dummyPlayers.length; i++) {
        const current = JSON.parse(JSON.stringify(dummyPlayers[i]));
        newList.push(current);
        if (i === index) { newList[i].status = true; } else {
          newList[i].status = false;
        }
      }
      setDummyPlayers(newList);
    }
  };
  const getModel = function (pID, pNum, isVoted) {
    let image;
    console.log(`isVoted is ${isVoted}`);
    if (isVoted) {
      image = redWolf;
    } else {
      image = wolfImage;
    }
    const playerIndex = 1;
    if (pNum === playerIndex) {
      image = playerWolf;
    }

    if (pNum === 1) {
      return <Player1 src={image} key={1} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 2) {
      return <Player2 src={image} key={2} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 3) {
      return <Player3 src={image} key={3} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 4) {
      return <Player4 src={image} key={4} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 5) {
      return <Player5 src={image} key={5} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 6) {
      return <Player6 src={image} key={6} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 7) {
      return <Player7 src={image} key={7} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
    if (pNum === 8) {
      return <Player8 src={image} key={8} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
    }
  };

  return (

    <PositioningDiv className="positioningDiv">
      <img src={playAreaBG} alt="A spooky scary background on a spaceship!" />
      {dummyPlayers.map((p, i) => {
        const CharacterModel = `Player${i + 1}`;
        return getModel(p.id, i + 1, p.status);
      })}

    </PositioningDiv>

  );

  useEffect(() => {

    // socket.on('start', (sender, msg) => {
    //   setMessages((prev) => [...prev, { sender, msg }]);
    // });

    // socket.on('suspect', suspectHandler)
    // socket.on('lockIn', lockHandler)
    // socket.on('ejectViaAirLock', ejectHandler)
    // socket.on('eatPlayer', eatHandler)
    // socket.on('player-disconnected',)
    // socket.on('chat-message', )
  }, []);

  // const {
  //   user, players, setUser, setPlayers,
  // } = useContext(GlobalContext);
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
