import React, {useEffect} from 'react';
import { GlobalContext } from '../../store';


function GameBoard(props) {
  useEffect(() => {
    socket.on('ejectedViaAirLock', ejectHandler)
    socket.on('werewolf-spotted',)
    socket.on('murdered',)
    socket.on('player-disconnected',)
    socket.on('chat-message', )
  }, [])

  const {user, players, setUser, setPlayers} =  useContext(GlobalContext);

  return (
    <div>index</div>
  )
}

export default index