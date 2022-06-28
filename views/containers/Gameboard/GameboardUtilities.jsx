//========================= GAMEMASTER ======================//

const runPlayerRound = () => {
  //start checking for enough votes to end round
  let lockedIn = players.map((player) => {
    if(player.lockedIn === true) {
      return player;
    }
  });
  //run endPlayerround when cleared
  if(lockedIn.length === players.length) {
    endPlayerRound(lockedIn);
  }
  setTimeout(runPlayerRound, 1000);

};

const endPlayerRound = (lockedIn) => {
  //run ejectViaAirlock if appropriate
  let votes = {};
  lockedIn.forEach((player) => {
    if(!votes[player.suspects]) {
      votes[player.suspects] = 1;
    } else {
      votes[player.suspects]++;
    }
  });

  let currentPoll = [['', 0]];

  for (let key in votes) {
    if (votes[key] > currentPoll[1]) {
      currentPoll = [key, votes[key]];
    }
  };

  if(player.isHost) {
    socket.emit('ejectViaAirLock', user, currentPoll[0]);
  }


  let colonists = [];
  let wolves = [];
  players.forEach(player) {
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
  clearData();
  runWolfRound();
};

const runWolfRound = () => {
  let wolves = 0;
  let wolvesLockedIn = players.map(player) {
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
      votes[player.suspects]++;
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
  players.forEach(player) {
    if(player.isWolf) {
      wolves.push(player);
    } else {
      colonists.push(player);
    }
  }

  if(colonists.length <= wolves.length) {
    //if yes go to wolves win screen
  }
  clearData();
  runPlayerRound();
};

  //========================= LISTENERS ======================//

  const voteHandler = (prosecutor, defendant) => {
    //change accusation for specified vote
    setPlayers((prev) => {
      prev.map((player) => {
        if(player.id === prosecutor.id) {
          return ({
            ...player,
            suspects: defendant,
          })
        }
      })
    });
  };

  const lockHandler = (prosecutor) => {
    //flip bool status for lock
    setPlayers((prev) => {
      prev.map((player) => {
        if(player.id === prosecutor.id) {
          return ({
            ...player,
            lockedIn: !player.lockedIn,
          })
        }
      })
    });
  };

  const ejectHandler = (host, suspect) => {
    //change alive status for indicated player
    //check to see if self needs to be ejected
    //if yes, eject self
    if(user.id === suspect.id) {
      setPlayer((prev) => ({
        ...prev,
        isDead: true,
      }));
    }
    setPlayers((prev) => {
      prev.map((player) => {
        if(player.id === suspect.id) {
          return ({
            ...player,
            isDead: true,
          })
        }
      })
    });

    //*
    //*
    //*
    //narrateEjection();
    //*
    //*
    //*
  };

  const eatHandler = (host, dinner) => {
    //change alive status for indicated player
    //check to see if self needs to be ejected
    //if yes, eject self
    if(user.id === dinner.id) {
      setPlayer((prev) => ({
        ...prev,
        isDead: true,
      }));
    }
    setPlayers((prev) => {
      prev.map((player) => {
        if(player.id === dinner.id) {
          return ({
            ...player,
            isDead: true,
          })
        }
      })
    });

    //*
    //*
    //*
    //narrateColonistEaten();
    //*
    //*
    //*
  }

  const clearData = () => {

    setPlayers((prev) => {
      prev.map((player, index, array) => {
        return ({
          ...player,
          suspects: null,
          lockedIn: false,
        })
      })
    });
    //change all the accusations to no one, and locked in to false
  }