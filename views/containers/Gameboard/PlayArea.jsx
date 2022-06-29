import React, { useEffect, useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { GlobalContext } from '../../store';
// import MusicPlayer from './components/musicPlayer';
// import socket from '../../util/socket.config.js';
// import all of the images
import Styled from 'styled-components';
import playAreaBG from '../../../Assets/img/playAreaBG.gif';
import { GlobalContext } from '../../store';
// import {
//   runPlayerRound,
//   endPlayerRound,
//   runWolfRound,
//   endWolfRound,
//   suspectHandler,
//   lockHandler,
//   ejectHandler,
//   eatHandler,
//   clearData,
//   suspect,
//   lockIn,
// } from './GameboardUtilities';
import socket from '../../util/socket.config';
import wolfImage from '../../../Assets/WhiteReady.png';
import redWolf from '../../../Assets/RedReady.png';
import playerWolf from '../../../Assets/playerWolf.png';

// build a reference object/array
// this should contain links to all the images/

const PlayArea = () => {
  const {
    player, players, setPlayer, setPlayers, characterList,
  } = useContext(GlobalContext);
  console.log(characterList);
  useEffect(() => {
    socket.on('suspect', suspectHandler);
    socket.on('lockIn', lockHandler);
    socket.on('ejectViaAirLock', ejectHandler);
    socket.on('eatPlayer', eatHandler);
    // socket.on('player-disconnected',);
    // socket.on('chat-message', );
    // if (player.isHost) {
    //   runPlayerRound();
    // }
  });
  //= ======================== scott stuff ======================//
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

  //= ======================== LISTENERS ======================//

  const suspectHandler = (prosecutor, defendant) => {
    // change accusation for specified vote
    console.log(`${prosecutor.id}suspsects${defendant.id}of being a werewolf!`);
    setPlayers((prev) => (
      prev.map((p) => {
        if (p.id === prosecutor.id) {
          return ({
            ...p,
            suspect: defendant,
          });
        }
        return p;
      })
    ));
  };

  const lockHandler = (prosecutor) => {
    // flip bool status for lock
    console.log(`${prosecutor.id}is sure that${defendant.id}is a werewolf!`);
    setPlayers((prev) => (
      prev.map((p) => {
        if (p.id === prosecutor.id) {
          return ({
            ...p,
            lockedIn: !p.lockedIn,
          });
        }
        return p;
      })
    ));
  };

  const ejectHandler = (host, suspect) => {
    // change alive status for indicated player
    // check to see if self needs to be ejected
    // if yes, eject self
    if (player.id === suspect.id) {
      setPlayer((prev) => ({
        ...prev,
        isDead: true,
      }));
    }
    setPlayers((prev) => (
      prev.map((p) => {
        if (p.id === suspect.id) {
          return ({
            ...p,
            isDead: true,
          });
        }
        return p;
      })
    ));

    //*
    //*
    //*
    // narrateEjection();
    console.log(suspect.id, 'was ejected from the airlock!');
    //*
    //*
    //*
  };

  const eatHandler = (host, dinner) => {
    // change alive status for indicated player
    // check to see if self needs to be ejected
    // if yes, eject self
    if (player.id === dinner.id) {
      setPlayer((prev) => ({
        ...prev,
        isDead: true,
      }));
    }
    setPlayers((prev) => (
      prev.map((p) => {
        if (p.id === dinner.id) {
          return ({
            ...p,
            isDead: true,
          });
        }
        return p;
      })
    ));

    //*
    //*
    //*
    // narrateColonistEaten();
    console.log(dinner.id, 'was eaten by werewolves!');
    //*
    //*
    //*
  };

  const clearData = () => {
    setPlayers((prev) => {
      prev.map((p) => ({
        ...p,
        suspect: null,
        lockedIn: false,
      }));
    });
    // change all the accusations to no one, and locked in to false
  };

  //= ======================== EMITTERS ======================//

  const suspect = (defendant) => {
    socket.emit('suspect', player, defendant);
  };

  const lockIn = () => {
    socket.emit('lockIn', player, player);
  };

  //= ======================== GAMEMASTER ======================//
  const endWolfRound = () => {
    const votes = {};
    players.forEach((p) => {
      if (p.isWolf) {
        if (!votes[p.suspect]) {
          votes[p.suspect] = 1;
        } else {
          votes[p.suspect] += 1;
        }
      }
    });

    let currentPoll = ['', 0];
    const voteArray = Object.keys(votes);
    voteArray.forEach((candidate) => {
      if (votes[candidate] > currentPoll[1]) {
        currentPoll = [candidate, votes[candidate]];
      }
    });

    socket.emit('eatPlayer', player, currentPoll[0]);

    const colonists = [];
    const wolves = [];
    players.forEach((p) => {
      if (p.isWolf) {
        wolves.push(p);
      } else {
        colonists.push(p);
      }
    });

    if (colonists.length <= wolves.length) {
      alert('Wolves win');
    }
    clearData();
    runPlayerRound();
  };

  const runWolfRound = () => {
    let wolves = 0;
    const wolvesLockedIn = players.map((p) => {
      if (p.isWolf) {
        wolves += 1;
        if (p.isLockedin) {
          return p;
        }
      }
    });
      // run endwolfround when cleared
    if (wolvesLockedIn.length === wolves) {
      endWolfRound(wolvesLockedIn);
    } else {
      setTimeout(runWolfRound, 1000);
    }
  };

  const endPlayerRound = () => {
    // run ejectViaAirlock if appropriate
    const votes = {};
    players.forEach((p) => {
      if (!votes[p.suspect]) {
        votes[p.suspect] = 1;
      } else {
        votes[p.suspect] += 1;
      }
    });

    let currentPoll = ['', 0];
    const voteArray = Object.keys(votes);
    voteArray.forEach((candidate) => {
      if (votes[candidate] > currentPoll[1]) {
        currentPoll = [candidate, votes[candidate]];
      }
    });

    if (player.isHost) {
      socket.emit('ejectViaAirLock', player, currentPoll[0]);
      // send messages as "narrator" into chat telling people what happened
    }

    const colonists = [];
    const wolves = [];
    players.forEach((p) => {
      if (p.isWolf) {
        wolves.push(p);
      } else {
        colonists.push(p);
      }
    });
    // check to see if all wolves are dead, or if wolves = colonists
    if (colonists.length <= wolves.length) {
      // if yes go to wolves win screen
      alert('Wolves win');
    }
    if (wolves.length < 0) {
      alert('Colonists win');
      // if yes go to colonists win screen
    }
    clearData();
    runWolfRound();
  };

  const runPlayerRound = () => {
    // start checking for enough votes to end round
    const lockedIn = players.map((p) => {
      if (p.lockedIn === true) {
        return p;
      }
    });
      // run endPlayerround when cleared
      //
    if (lockedIn.length === players.length) {
      endPlayerRound(lockedIn);
    } else {
      setTimeout(runPlayerRound, 100);
    }
  };

  console.log(characterList);

  // const getModel = function (pID, pNum) {
  //   if (pNum === 1) {
  //     return <Player1 src={wolfImage} key={pID} num={pNum} />;
  //   }
  // };

  return (
    <PositioningDiv className="positioningDiv">
      <img src={playAreaBG} alt="A spooky scary background on a spaceship!" />
      {dummyPlayers.map((p, i) => getModel(p.id, i + 1, p.status))}
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
