import React, {createContext, useState} from 'react';

const GlobalContext = createContext()
const GlobalProvider = props => {

// =================================================== create your state below
const [isDarkMode, setIsDarkMode] = useState('false');
const [player, setPlayer] = useState({
  username: 'ethan',
  isDead: false,
  isWolf: false,
  socket: {},
});
const [gameID, setGameID] = useState('');


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
  }}>
    {props.children}
  </GlobalContext.Provider>
)
}

export { GlobalContext, GlobalProvider }