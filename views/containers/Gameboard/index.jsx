import React, {useEffect} from 'react';
import { GlobalContext } from '../../store';


function GameBoard(props) {
  useEffect(() => {
    socket.on('suspect', suspectHandler)
    socket.on('lockIn', lockHandler)
    socket.on('ejectViaAirLock', ejectHandler)
    socket.on('eatPlayer', eatHandler)
    socket.on('player-disconnected',)
    socket.on('chat-message', )
  }, [])

  const {user, players, setUser, setPlayers} =  useContext(GlobalContext);

  return (
    <div>index</div>
  )
}

export default index