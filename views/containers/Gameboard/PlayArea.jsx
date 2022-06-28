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

// build a reference object/array
// this should contain links to all the images/

const PlayArea = (props) => {
  const { player, players, characterList } = useContext(GlobalContext);
  const filler = 'filled';
  const [numPlayers, setNumPlayers] = useState(0);
  console.log(characterList);
  return (

    <PositioningDiv className="positioningDiv">
      <img src={playAreaBG} alt="A spooky scary background on a spaceship!" />
      {players.map((p, i) => {
        const CharacterModel = `Player${i + 1}`;
        return <CharacterModel src={characterList[3]} />;
      })}

    </PositioningDiv>

  );

  // useEffect(() => {
  //   socket.on('suspect', suspectHandler)
  //   socket.on('lockIn', lockHandler)
  //   socket.on('ejectViaAirLock', ejectHandler)
  //   socket.on('eatPlayer', eatHandler)
  //   socket.on('player-disconnected',)
  //   socket.on('chat-message', )
  // }, [])

  // const {
  //   user, players, setUser, setPlayers,
  // } = useContext(GlobalContext);
};

const PositioningDiv = Styled.div`
position: relative;
width: fit-content;
height: fit-content;

`;
const Player1 = Styled.div`
position: absolute;
top: 65%;
left: 10%;
`;

const Player2 = Styled.div`
position: absolute;
top: 80%;
left: 20%;
`;

const Player3 = Styled.div`
position: absolute;
top: 65%;
left: 30%;
`;

const Player4 = Styled.div`
position: absolute;
top: 80%;
left: 40%;
`;

const Player5 = Styled.div`
position: absolute;
top: 65%;
left: 50%;
`;

const Player6 = Styled.div`
position: absolute;
top: 80%;
left: 60%;
`;

const Player7 = Styled.div`
position: absolute;
top: 65%;
left: 70%;
`;

const Player8 = Styled.div`
position: absolute;
top: 80%;
left: 80%;
`;

// const PlayerContainer = Styled.div`
//   position: absolute;
//   margin: 20%;
// `;

export default PlayArea;
