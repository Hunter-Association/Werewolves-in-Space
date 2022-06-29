import React, {createContext, useState} from 'react';
import adventureGirl from '../../Assets/characters/singleAdventureGirl.png';
import agent from '../../Assets/characters/singleAgent.png';
import cyberpunk from '../../Assets/characters/singleCyberpunk.png';
import soldier from '../../Assets/characters/singleFutureSoldier.png';
import normalGirl from '../../Assets/characters/singleNormalGirl.png';


const GlobalContext = createContext();
const GlobalProvider = props => {

// =================================================== create your state below
const [isDarkMode, setIsDarkMode] = useState('false');
const [isSoundEnabled, setIsSoundEnabled] = useState('true');
const [characterList, setCharacterList] = useState(
  [adventureGirl, agent, cyberpunk, soldier, normalGirl],
);

const [player, setPlayer] = useState({
  username: 'anonymous',
  isDead: false,
  isWolf: false,
  socket: {},
  id: '',
  charDex: null,
  status: false,
  isHost: true
});
const [players, setPlayers] = useState([{
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
}
]);
const [gameID, setGameID] = useState(''); // When user joins game he will give this, host game create this.


const [sessionData, setSessionData] = useState(null);

// =================================================== export your state and setState functions here
return (
  <GlobalContext.Provider value={{
    /*state goes here*/
    isDarkMode,
    setIsDarkMode,
    isSoundEnabled,
    gameID,
    setGameID,
    player,
    setPlayer,
    players,
    setPlayers,
    sessionData,
    setSessionData,
    characterList,
    setCharacterList,
  }}>
    {props.children}
  </GlobalContext.Provider>
)
}

export { GlobalContext, GlobalProvider }