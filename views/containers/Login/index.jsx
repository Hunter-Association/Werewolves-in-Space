import React, { useContext, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { GlobalContext } from '../../store';
import { Row, Button } from '../../library';

const Login = () => {
  const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);
  const [socket, setSocket] = useState({});
  const [players, setPlayers] = useState([]);
  const [votes, setVotes] = useState([]);

  useMemo(() => {
    const skt = io();
    skt.player = { username: 'ethan' };
    skt.gameID = 'ethan';
    setSocket(skt);
  }, []);

  const clickHandler = () => {
    socket.emit('join-game', 'ethan', { username: 'ethan' });
  };

  const voteHandler = () => {
    socket.emit('vote', 'ethan', { username: 'ethan' }, { username: 'wolfie' });
  };

  useEffect(() => {
    socket.on('player-voted', (prson, player) => {
      console.log(socket);
      setVotes(prson);
      console.log(prson);
    });
    socket.on('player-joined', (playersArr) => {
      console.log(socket);
      setPlayers(playersArr);
      console.log(playersArr);
    });

    return socket.disconnect;
  }, []);

  return (
    <Row>
      <Link to="/home">
        <div>this blows</div>
      </Link>
      <Button onClick={voteHandler}>Click me to vote</Button>
      <Button onClick={clickHandler}>Click me to connect</Button>
    </Row>
  );
};

export default Login;
