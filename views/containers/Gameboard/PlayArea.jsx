/* eslint-disable max-len */
import React, {
  useEffect, useContext, useState, useRef,
} from 'react';

import Styled from 'styled-components';
import playAreaBG from '../../../Assets/img/playAreaBG.gif';
import NightTimeBG from '../../../Assets/NightTimeBG.png';
import { GlobalContext } from '../../store';
import socket from '../../util/socket.config';

const PlayArea = () => {
  const {
    player, players, setPlayer, setPlayers, characterList, gameID,
  } = useContext(GlobalContext);
  const [gameState, setGameState] = useState({
    players, isDay: true, winners: 'nobody', isDone: false,
  });
  const hasRan = useRef(false);
  useEffect(() => {
    if (!hasRan.current) {
      socket.on('state-change', (gs) => {
        setGameState(gs);
        console.log('gameSTate', gs);
        gs.players.forEach((p) => {
          if (p.username === player.username) {
            setPlayer(p);
          }
        });
      });
    }
  }, []);

  const handler = (number, e) => {
    e.stopPropagation();
    if (gameState.isDay) {
      console.log('ran', gameState.players[number]);
      socket.emit('suspect', gameID, player, gameState.players[number]);
    } else if (player.isWolf) {
      console.log('ran at night');
      socket.emit('eat', gameID, gameState.players[number]);
    }
  };

  const characters = [
    <Player1 src={characterList[gameState.players[0]?.charDex]} key={1} onClick={(e) => handler(0, e)} />,
    <Player2 src={characterList[gameState.players[1]?.charDex]} key={2} onClick={(e) => handler(1, e)} />,
    <Player3 src={characterList[gameState.players[2]?.charDex]} key={3} onClick={(e) => handler(2, e)} />,
    <Player4 src={characterList[gameState.players[3]?.charDex]} key={4} onClick={(e) => handler(3, e)} />,
    <Player5 src={characterList[gameState.players[4]?.charDex]} key={5} onClick={(e) => handler(4, e)} />,
    <Player6 src={characterList[gameState.players[5]?.charDex]} key={6} onClick={(e) => handler(5, e)} />,
    <Player7 src={characterList[gameState.players[6]?.charDex]} key={7} onClick={(e) => handler(6, e)} />,
    <Player8 src={characterList[gameState.players[7]?.charDex]} key={8} onClick={(e) => handler(7, e)} />,
  ];

  const suspects = [
    <Player1>
      <img src={characterList[gameState.players[0]?.charDex]} key={1} onClick={(e) => handler(0, e)} />
      <Suspect1>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect1>
    </Player1>,
    <div>
      <Player2 src={characterList[gameState.players[1]?.charDex]} key={2} onClick={(e) => handler(1, e)} />
      <Suspect2>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect2>
    </div>,
    <div>
      <Player3 src={characterList[gameState.players[2]?.charDex]} key={3} onClick={(e) => handler(2, e)} />
      <Suspect3>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect3>
    </div>,
    <div>
      <Player4 src={characterList[gameState.players[3]?.charDex]} key={4} onClick={(e) => handler(3, e)} />
      <Suspect4>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect4>
    </div>,
    <div>
      <Player5 src={characterList[gameState.players[4]?.charDex]} key={5} onClick={(e) => handler(4, e)} />
      <Suspect5>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect5>
    </div>,
    <div>
      <Player6 src={characterList[gameState.players[5]?.charDex]} key={6} onClick={(e) => handler(5, e)} />
      <Suspect6>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect6>
    </div>,
    <div>
      <Player7 src={characterList[gameState.players[6]?.charDex]} key={7} onClick={(e) => handler(6, e)} />
      <Suspect7>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect7>
    </div>,
    <div>
      <Player8 src={characterList[gameState.players[7]?.charDex]} key={8} onClick={(e) => handler(7, e)} />
      <Suspect8>{player.isLockedIn ? 'Suspicion Cast!' : 'Suspect'}</Suspect8>
    </div>,
  ];

  return (
    <PositioningDiv className="positioningDiv">
      {
        gameState.isDone ? (
          <h1>
            {gameState.winners}
            {' '}
            won the game!
          </h1>
        ) : null
      }

      {
        !gameState.isDone
         && (gameState.isDay ? <DayNightHeading>Find the WereWolf</DayNightHeading> : <DayNightHeading>Choose your Prey</DayNightHeading>)
      }

      { (!gameState.isDone && gameState.isDay)
     && <LockInButton onClick={(e) => { e.stopPropagation(); socket.emit('lockIn', gameID, player); }}>Lock-In</LockInButton>}
      {
        !gameState.isDone && (gameState.isDay ? (<img src={playAreaBG} alt="A spooky scary background on a spaceship!" />) : (<img src={NightTimeBG} alt="A spooky scary background on a spaceship!" />))
      }

      { !gameState.isDone
      && gameState.players.map((p, i) => {
        if (p.isDead) {
          return <span />;
        }
        if (p.username === player.suspect.username) {
          return <div>{suspects[i]}</div>;
        }
        return <div>{characters[i]}</div>;
      })}
    </PositioningDiv>
  );
};

const getModelStyle = function (theIndex) {
  const index = theIndex - 1;
  const left = `${12.5 * index}%`;
  const bottom = `${((index % 2) * 10)}%`;
  const result = {
    position: 'absolute',
    bottom,
    left,
    width: '12.5%',
  };
  return result;
};

//  =============styles below::::
const DayNightHeading = Styled.h1`
  letter-spacing: 4px;
`;

const LockInButton = Styled.button`
  position: absolute;
  height: 50px;
  left: 50%;
  right: 50%;
  width: 100px;
  letter-spacing: 4px;
`;

const PositioningDiv = Styled.div`
position: relative;
width: fit-content;
width: 100%;
height: fit-content;

`;
const Player1 = Styled.img`
  ${getModelStyle(1)}
`;

const Player2 = Styled.img`
  ${getModelStyle(2)}
`;

const Player3 = Styled.img`
  ${getModelStyle(3)}
`;

const Player4 = Styled.img`
  ${getModelStyle(4)}
`;

const Player5 = Styled.img`
  ${getModelStyle(5)}
`;

const Player6 = Styled.img`
  ${getModelStyle(6)}
`;

const Player7 = Styled.img`
  ${getModelStyle(7)}
`;

const Player8 = Styled.img`
  ${getModelStyle(8)}
`;

const Suspect1 = Styled.div`
  color: white;
  z-index: 10;
`;

const Suspect2 = Styled.div`
color: white;
z-index: 10;
`;

const Suspect3 = Styled.div`
color: white;
z-index: 10;
`;

const Suspect4 = Styled.div`
color: white;
z-index: 10;
`;

const Suspect5 = Styled.div`
color: white;
z-index: 10;
`;

const Suspect6 = Styled.div`
color: white;
z-index: 10;
`;

const Suspect7 = Styled.div`
color: white;
z-index: 10;
`;

const Suspect8 = Styled.div`
color: white;
z-index: 10;
`;

export default PlayArea;

// Legacy

//= ======================== scott stuff ======================//
// const filler = 'filled';
// const [numPlayers, setNumPlayers] = useState(0);
// console.log(dummyPlayers);

// const [dummyPlayers, setDummyPlayers] = useState([{
//   username: 'realkllkdajldfdfakdjflksdsfd adlsd', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// },
// {
//   username: 'user2', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// }, {
//   username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: true,
// }, {
//   username: 'user4', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// }, {
//   username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// }, {
//   username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// }, {
//   username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// }, {
//   username: 'user3', isDead: false, isWolf: false, socket: {}, id: '', charDex: null, status: false,
// }]);

// const handleClick = function (index) {
//   const newList = [];
//   const selfIndex = 0; // where the player is in the list of players
//   console.log(player);
//   if (index !== selfIndex) {
//     for (let i = 0; i < dummyPlayers.length; i++) {
//       const current = JSON.parse(JSON.stringify(dummyPlayers[i]));
//       newList.push(current);
//       if (i === index) { newList[i].status = true; } else {
//         newList[i].status = false;
//       }
//     }
//     setDummyPlayers(newList);
//   }
// };
// const getModel = function (pID, pNum, isVoted) {
//   let image;
//   console.log(`isVoted is ${isVoted}`);
//   if (isVoted) {
//     image = redWolf;
//   } else {
//     image = wolfImage;
//   }
//   const playerIndex = 1;
//   if (pNum === playerIndex) {
//     image = playerWolf;
//   }

//   if (pNum === 1) {
//     return <Player1 src={image} key={1} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 2) {
//     return <Player2 src={image} key={2} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 3) {
//     return <Player3 src={image} key={3} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 4) {
//     return <Player4 src={image} key={4} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 5) {
//     return <Player5 src={image} key={5} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 6) {
//     return <Player6 src={image} key={6} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 7) {
//     return <Player7 src={image} key={7} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
//   if (pNum === 8) {
//     return <Player8 src={image} key={8} num={pNum} onClick={() => (handleClick(pNum - 1))} />;
//   }
// };

// //= ======================== LISTENERS ======================//

// const suspectHandler = (prosecutor, defendant) => {
//   // change accusation for specified vote
//   console.log(`${prosecutor.id}suspsects${defendant.id}of being a werewolf!`);
//   setPlayers((prev) => (
//     prev.map((p) => {
//       if (p.id === prosecutor.id) {
//         return ({
//           ...p,
//           suspect: defendant,
//         });
//       }
//       return p;
//     })
//   ));
// };

// const lockHandler = (prosecutor) => {
//   // flip bool status for lock
//   console.log(`${prosecutor.id}is sure that${defendant.id}is a werewolf!`);
//   setPlayers((prev) => (
//     prev.map((p) => {
//       if (p.id === prosecutor.id) {
//         return ({
//           ...p,
//           lockedIn: !p.lockedIn,
//         });
//       }
//       return p;
//     })
//   ));
// };

// const ejectHandler = (host, suspect) => {
//   // change alive status for indicated player
//   // check to see if self needs to be ejected
//   // if yes, eject self
//   if (player.id === suspect.id) {
//     setPlayer((prev) => ({
//       ...prev,
//       isDead: true,
//     }));
//   }
//   setPlayers((prev) => (
//     prev.map((p) => {
//       if (p.id === suspect.id) {
//         return ({
//           ...p,
//           isDead: true,
//         });
//       }
//       return p;
//     })
//   ));

//   //*
//   //*
//   //*
//   // narrateEjection();
//   console.log(suspect.id, 'was ejected from the airlock!');
//   //*
//   //*
//   //*
// };

// const eatHandler = (host, dinner) => {
//   // change alive status for indicated player
//   // check to see if self needs to be ejected
//   // if yes, eject self
//   if (player.id === dinner.id) {
//     setPlayer((prev) => ({
//       ...prev,
//       isDead: true,
//     }));
//   }
//   setPlayers((prev) => (
//     prev.map((p) => {
//       if (p.id === dinner.id) {
//         return ({
//           ...p,
//           isDead: true,
//         });
//       }
//       return p;
//     })
//   ));

//   //*
//   //*
//   //*
//   // narrateColonistEaten();
//   console.log(dinner.id, 'was eaten by werewolves!');
//   //*
//   //*
//   //*
// };

// const clearData = () => {
//   setPlayers((prev) => {
//     prev.map((p) => ({
//       ...p,
//       suspect: null,
//       lockedIn: false,
//     }));
//   });
//   // change all the accusations to no one, and locked in to false
// };

// //= ======================== EMITTERS ======================//

// const suspect = (defendant) => {
//   socket.emit('suspect', player, defendant);
// };

// const lockIn = () => {
//   socket.emit('lockIn', player, player);
// };

// //= ======================== GAMEMASTER ======================//
// const endWolfRound = () => {
//   const votes = {};
//   players.forEach((p) => {
//     if (p.isWolf) {
//       if (!votes[p.suspect]) {
//         votes[p.suspect] = 1;
//       } else {
//         votes[p.suspect] += 1;
//       }
//     }
//   });

//   let currentPoll = ['', 0];
//   const voteArray = Object.keys(votes);
//   voteArray.forEach((candidate) => {
//     if (votes[candidate] > currentPoll[1]) {
//       currentPoll = [candidate, votes[candidate]];
//     }
//   });

//   socket.emit('eatPlayer', player, currentPoll[0]);

//   const colonists = [];
//   const wolves = [];
//   players.forEach((p) => {
//     if (p.isWolf) {
//       wolves.push(p);
//     } else {
//       colonists.push(p);
//     }
//   });

//   if (colonists.length <= wolves.length) {
//     alert('Wolves win');
//   }
//   clearData();
//   runPlayerRound();
// };

// const runWolfRound = () => {
//   let wolves = 0;
//   const wolvesLockedIn = players.map((p) => {
//     if (p.isWolf) {
//       wolves += 1;
//       if (p.isLockedin) {
//         return p;
//       }
//     }
//   });
//     // run endwolfround when cleared
//   if (wolvesLockedIn.length === wolves) {
//     endWolfRound(wolvesLockedIn);
//   } else {
//     setTimeout(runWolfRound, 1000);
//   }
// };

// const endPlayerRound = () => {
//   // run ejectViaAirlock if appropriate
//   const votes = {};
//   players.forEach((p) => {
//     if (!votes[p.suspect]) {
//       votes[p.suspect] = 1;
//     } else {
//       votes[p.suspect] += 1;
//     }
//   });

//   let currentPoll = ['', 0];
//   const voteArray = Object.keys(votes);
//   voteArray.forEach((candidate) => {
//     if (votes[candidate] > currentPoll[1]) {
//       currentPoll = [candidate, votes[candidate]];
//     }
//   });

//   if (player.isHost) {
//     socket.emit('ejectViaAirLock', player, currentPoll[0]);
//     // send messages as "narrator" into chat telling people what happened
//   }

//   const colonists = [];
//   const wolves = [];
//   players.forEach((p) => {
//     if (p.isWolf) {
//       wolves.push(p);
//     } else {
//       colonists.push(p);
//     }
//   });
//   // check to see if all wolves are dead, or if wolves = colonists
//   if (colonists.length <= wolves.length) {
//     // if yes go to wolves win screen
//     alert('Wolves win');
//   }
//   if (wolves.length < 0) {
//     alert('Colonists win');
//     // if yes go to colonists win screen
//   }
//   clearData();
//   runWolfRound();
// };

// const runPlayerRound = () => {
//   // start checking for enough votes to end round
//   const lockedIn = players.map((p) => {
//     if (p.lockedIn === true) {
//       return p;
//     }
//   });
//     // run endPlayerround when cleared
//     //
//   if (lockedIn.length === players.length) {
//     endPlayerRound(lockedIn);
//   } else {
//     setTimeout(runPlayerRound, 100);
//   }
// };

// console.log(characterList);

// // const getModel = function (pID, pNum) {
// //   if (pNum === 1) {
// //     return <Player1 src={wolfImage} key={pID} num={pNum} />;
// //   }
// // };

// const handleButtonClick = function () {
//   console.log('so and so has locked in!');
// };

// let hat = 'just a hat';
