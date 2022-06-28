//= ======================== GAMEMASTER ======================//

// TODO - Export all functions so the socket handlers can run them

export const runPlayerRound = () => {
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

export const endPlayerRound = (lockedIn) => {
  // run ejectViaAirlock if appropriate
  const votes = {};
  lockedIn.forEach((p) => {
    if (!votes[p.suspects]) {
      votes[p.suspects] = 1;
    } else {
      votes[p.suspects]++;
    }
  });

  let currentPoll = [['', 0]];

  for (const key in votes) {
    if (votes[key] > currentPoll[1]) {
      currentPoll = [key, votes[key]];
    }
  }

  if (player.isHost) {
    socket.emit('ejectViaAirLock', player, currentPoll[0]);
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

export const runWolfRound = () => {
  let wolves = 0;
  const wolvesLockedIn = players.map((p) => {
    if (p.isWolf) {
      wolves++;
      if (p.isLockedin) {
        return p;
      }
    }
  });
  // run endwolfround when cleared
  if (wolvesLockedIn.length === wolves) {
    endWolfRound(wolvesLockedIn);
  }
  setTimeout(runWolfRound, 1000);
};

export const endWolfRound = (wolvesLockedIn) => {
  const votes = {};
  wolvesLockedIn.forEach((p) => {
    const voteFor = p.suspects;
    if (!votes[p.suspects]) {
      votes[p.suspects] = 1;
    } else {
      votes[p.suspects]++;
    }
  });

  let currentPoll = ['', 0];

  for (const key in votes) {
    if (votes[key] > currentPoll[1]) {
      currentPoll = [key, votes[key]];
    }
  }

  if (player.isHost) {
    socket.emit('eatPlayer', player, currentPoll[0]);
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

  if (colonists.length <= wolves.length) {
    // if yes go to wolves win screen
  }
  clearData();
  runPlayerRound();
};

//= ======================== LISTENERS ======================//

export const suspectHandler = (prosecutor, defendant) => {
  // change accusation for specified vote
  setPlayers((prev) => {
    prev.map((p) => {
      if (p.id === prosecutor.id) {
        return ({
          ...p,
          suspects: defendant,
        });
      }
    });
  });
};

export const lockHandler = (prosecutor) => {
  // flip bool status for lock
  setPlayers((prev) => {
    prev.map((p) => {
      if (p.id === prosecutor.id) {
        return ({
          ...p,
          lockedIn: !p.lockedIn,
        });
      }
    });
  });
};

export const ejectHandler = (host, suspect) => {
  // change alive status for indicated player
  // check to see if self needs to be ejected
  // if yes, eject self
  if (user.id === suspect.id) {
    setPlayer((prev) => ({
      ...prev,
      isDead: true,
    }));
  }
  setPlayers((prev) => {
    prev.map((p) => {
      if (p.id === suspect.id) {
        return ({
          ...p,
          isDead: true,
        });
      }
    });
  });

  //*
  //*
  //*
  // narrateEjection();
  //*
  //*
  //*
};

export const eatHandler = (host, dinner) => {
  // change alive status for indicated player
  // check to see if self needs to be ejected
  // if yes, eject self
  if (user.id === dinner.id) {
    setPlayer((prev) => ({
      ...prev,
      isDead: true,
    }));
  }
  setPlayers((prev) => {
    prev.map((p) => {
      if (p.id === dinner.id) {
        return ({
          ...p,
          isDead: true,
        });
      }
    });
  });

  //*
  //*
  //*
  // narrateColonistEaten();
  //*
  //*
  //*
};

export const clearData = () => {
  setPlayers((prev) => {
    prev.map((p, index, array) => ({
      ...p,
      suspects: null,
      lockedIn: false,
    }));
  });
  // change all the accusations to no one, and locked in to false
};

//= ======================== EMITTERS ======================//

export const suspect = (defendant) => {
  socket.emit('suspect', player, defendant);
};

export const lockIn = () => {
  socket.emit('lockIn', player, player);
};
