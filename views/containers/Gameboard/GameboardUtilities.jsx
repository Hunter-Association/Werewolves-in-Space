//========================= GAMEMASTER ======================//

//TODO - Export all functions so the socket handlers can run them

const runPlayerRound = () => {
  //start checking for enough votes to end round
  let lockedIn = players.map((p) => {
    if(p.lockedIn === true) {
      return p;
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
  lockedIn.forEach((p) => {
    if(!votes[p.suspects]) {
      votes[p.suspects] = 1;
    } else {
      votes[p.suspects]++;
    }
  });

  let currentPoll = [['', 0]];

  for (let key in votes) {
    if (votes[key] > currentPoll[1]) {
      currentPoll = [key, votes[key]];
    }
  };

  if(player.isHost) {
    socket.emit('ejectViaAirLock', player, currentPoll[0]);
  }


  let colonists = [];
  let wolves = [];
  players.forEach(p) {
    if(p.isWolf) {
      wolves.push(p);
    } else {
      colonists.push(p);
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
  let wolvesLockedIn = players.map(p) {
    if(p['isWolf']) {
      wolves++;
      if(p['isLockedin']) {
        return p;
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
  wolvesLockedIn.forEach(p) {
    let voteFor = p.suspects;
    if(!votes[p.suspects]) {
      votes[p.suspects] = 1;
    } else {
      votes[p.suspects]++;
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
  players.forEach(p) {
    if(p.isWolf) {
      wolves.push(p);
    } else {
      colonists.push(p);
    }
  }

  if(colonists.length <= wolves.length) {
    //if yes go to wolves win screen
  }
  clearData();
  runPlayerRound();
};

  //========================= LISTENERS ======================//

  const suspectHandler = (prosecutor, defendant) => {
    //change accusation for specified vote
    setPlayers((prev) => {
      prev.map((p) => {
        if(p.id === prosecutor.id) {
          return ({
            ...p,
            suspects: defendant,
          })
        }
      })
    });
  };

  const lockHandler = (prosecutor) => {
    //flip bool status for lock
    setPlayers((prev) => {
      prev.map((p) => {
        if(p.id === prosecutor.id) {
          return ({
            ...p,
            lockedIn: !p.lockedIn,
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
      prev.map((p) => {
        if(p.id === suspect.id) {
          return ({
            ...p,
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
      prev.map((p) => {
        if(p.id === dinner.id) {
          return ({
            ...p,
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
      prev.map((p, index, array) => {
        return ({
          ...p,
          suspects: null,
          lockedIn: false,
        })
      })
    });
    //change all the accusations to no one, and locked in to false
  }

<<<<<<< HEAD
    //========================= EMITTERS ======================//

  const suspect = (defendant) => {
    socket.emit('suspect', player, defendant);
  };

  const lockIn = () => {
    socket.emit('lockIn', player, player);
  };
=======
>>>>>>> cc17bdfb3a081dc2a46862162ddfa9723e3a7868
