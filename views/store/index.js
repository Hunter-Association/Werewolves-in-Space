import React, {createContext, useState} from 'react';

const GlobalContext = createContext()
const GlobalProvider = props => {

// =================================================== create your state below
const [isDarkMode, setIsDarkMode] = useState('false');
<<<<<<< HEAD
const [player, setPlayer] = useState({
  username: 'ethan',
  isDead: false,
  isWolf: false,
  socket: {},
});
const [players, setPlayers] = useState([]);
const [gameID, setGameID] = useState(''); // When user joins game he will give this, host game create this.

=======
const [userData, setUserData] = useState(null);
const [sessionData, setSessionData] = useState(null);
>>>>>>> dev

// =================================================== export your state and setState functions here
return (
  <GlobalContext.Provider value={{
    /*state goes here*/
    isDarkMode,
    setIsDarkMode,
<<<<<<< HEAD
    gameID,
    setGameID,
    player,
    setPlayer,
    players,
    setPlayers,
=======
    userData,
    setUserData,
    sessionData,
    setSessionData,
>>>>>>> dev
  }}>
    {props.children}
  </GlobalContext.Provider>
)
}

export { GlobalContext, GlobalProvider }