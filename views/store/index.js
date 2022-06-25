import React, {createContext, useState} from 'react';

const GlobalContext = createContext()
const GlobalProvider = props => {

// =================================================== create your state below
const [isDarkMode, setIsDarkMode] = useState('false');

// =================================================== export your state and setState functions here
return (
  <GlobalContext.Provider value={{
    /*state goes here*/
    isDarkMode,
    setIsDarkMode
  }}>
    {props.children}
  </GlobalContext.Provider>
)
}

export { GlobalContext, GlobalProvider }