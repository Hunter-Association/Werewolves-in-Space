// socket.on("Gamestart", (...args) => {
//   // route to game view
// });

//========================= GAMEMASTER ======================//

const runPlayerRound = () => {
  //start checking for enough votes to end round
  let lockedIn = playerData.map(player) {
    if(player.lockedIn === true) {
      return player;
    }
  };
  //run endPlayerround when cleared
  if(lockedIn.length === playerData.length) {
    endPlayerRound(lockedIn);
  }
  setTimeout(runPlayerRound, 1000);

};

const endPlayerRound = (lockedIn) => {
  //run ejectViaAirlock if appropriate
  let votes = {};
  lockedIn.forEach(player) {
    let voteFor = player.suspects;
    if(!votes[player.suspects]) {
      votes[player.suspects] = 1;
    } else {
      votes[player.suspects] ++;
    }
  }

  let currentPoll = ['', 0];

  for (let key in votes) {
    if (votes[key] > currentPoll[1]) {
      currentPoll = [key, votes[key]];
    }
  };

  if(player.isHost) {
    socket.emit('ejectViaAirlock', player, currentPoll[0]);
  }

  let colonists = [];
  let wolves = [];
  playerData.forEach(player) {
    if(player.isWolf) {
      wolves.push(player);
    } else {
      colonists.push(player);
    }
  }
  //check to see if all wolves are dead, or if wolves = colonists
  if(colonists.length <= wolves.length) {
    //if yes go to wolves win screen
  }
  if (wolves.length < 0) {
    //if yes go to colonists win screen
  }

  runWolfRound();
};

const runWolfRound = () => {
  let wolves = 0;
  let wolvesLockedIn = playerData.map(player) {
    if(player['isWolf']) {
      wolves++;
      if(player['isLockedin']) {
        return player;
      }
    }
  };
  //run endwolfround when cleared
  if(wolvesLockedIn.length === wolves) {
    endWolfRound(wolvesLockedIn);
  }
  setTimeout(runWolfRound, 1000);
};

const endWolfRound = (wolvesLockedIn) => {
  let votes = {};
  wolvesLockedIn.forEach(player) {
    let voteFor = player.suspects;
    if(!votes[player.suspects]) {
      votes[player.suspects] = 1;
    } else {
      votes[player.suspects] ++;
    }
  }

  let currentPoll = ['', 0];

  for (let key in votes) {
    if (votes[key] > currentPoll[1]) {
      currentPoll = [key, votes[key]];
    }
  };

  if(player.isHost) {
    socket.emit('eatPlayer', player, currentPoll[0]);
  }

  let colonists = [];
  let wolves = [];
  playerData.forEach(player) {
    if(player.isWolf) {
      wolves.push(player);
    } else {
      colonists.push(player);
    }
  }

  if(colonists.length <= wolves.length) {
    //if yes go to wolves win screen
  }
  runPlayerRound();
};

//========================= EMMITERS ======================//

const setVote = () => {
  //send an emmiter to say who they are voting for
};

const lockVote = () => {
  //send an emmiter to flip lock in status
};

const ejectViaAirlock = () => {
  //eject player from airlock with emmiter
  //announce player has been ejected
  //run ejection animations
};

const eatPlayer = () => {
  //eat player with event emmiter
  //announce player has been eaten
  //run eating animations
};

//========================= LISTENERS ======================//

const voteHandler = () => {
  //change accusation for specified vote

};

const voteHandler = () => {
  //flip bool status for lock
  const [isLocked, setIsLocked] = useState(!!isLocked);

};

const ejectHandler = () => {
  //change alive status for indicated player
  const [isAlive, setIsAlive] = useState(false);

};

const eatPlayer = () => {
  //change alive status for indicated player
  // set state for player "isAlive" to false
  const [isAlive, setIsAlive] = useState(false);

}

const clearData = () => {
  //change all the accusations to no one, and locked in to false
}