import React, {createContext, useState} from 'react';

const GlobalContext = createContext()
const GlobalProvider = props => {

// =================================================== create your state below
const [isDarkMode, setIsDarkMode] = useState('false');
const [player, setPlayer] = useState(null);
const [players, setPlayers] = useState([]);
const [gameID, setGameID] = useState(''); // When user joins game he will give this, host game create this.


const [sessionData, setSessionData] = useState(null);

// =================================================== export your state and setState functions here
return (
  <GlobalContext.Provider value={{
    /*state goes here*/
    isDarkMode,
    setIsDarkMode,
    gameID,
    setGameID,
    player,
    setPlayer,
    players,
    setPlayers,
    sessionData,
    setSessionData,
  }}>
    {props.children}
  </GlobalContext.Provider>
)
}

export { GlobalContext, GlobalProvider }