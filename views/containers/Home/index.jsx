import React, { useContext, useState } from 'react';
import copy from 'copy-to-clipboard';
import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button, Center, Row,
} from '../../library';
import { GlobalContext } from '../../store';
import socket from '../../util/socket.config';
import clipboard from '../../../Assets/clipboard2-plus-fill.svg';
import werewolf from '../../../Assets/werewolfbanner.png';

const Home = () => {
  const {
    gameID,
    setGameID,
    player,
    setPlayer,
    players,
    setPlayers,
  } = useContext(GlobalContext);

  const [showHostOptions, setShowHostOptions] = useState(false);
  const [showJoinOptions, setShowJoinOptions] = useState(false);
  const joinGame = () => {
    socket.on('player-joined', (allPlayers) => {
      console.log(allPlayers);
      setPlayers(allPlayers);
    });
    socket.emit('join-game', gameID, player);
  };
  const hostHandler = () => {
    setShowHostOptions((prev) => !prev);
  };
  const joinHandler = () => {
    setShowJoinOptions((prev) => !prev);
  };

  return (
    <Center>
      <Image src={werewolf} alt="space-werewolf" />
      <Form>
        <Button onClick={hostHandler} backgroundColor="red">Host Game</Button>
        <HostOptions show={showHostOptions} gameID={gameID} joinGame={joinGame} />
        <Button onClick={joinHandler} backgroundColor="red">Join Game</Button>
        <JoinOptions show={showJoinOptions} changeText={setGameID} joinGame={joinGame} />
      </Form>
    </Center>
  );
};
export default Home;

const HostOptions = ({ show, joinGame, gameID }) => {
  const [copied, setCopied] = useState(false);
  return (
    <span>
      {
      show && (
      <Row justify="space-between" align="center">
        <Text
          justify="space-between"
          align="center"
          onClick={() => {
            copy(gameID);
            setCopied((prev) => !prev);
          }}
        >
          {gameID}
          <Icon src={clipboard} alt="clipboard" />
        </Text>
        <Link to="/lobby">
          <button type="button" onClick={joinGame}>Go</button>
        </Link>
      </Row>
      )
      }
    </span>
  );
};
const JoinOptions = ({ show, joinGame, changeText }) => (
  <span>
    {
      show && (
        <Row>
          <input type="text" onChange={(e) => changeText(e.target.value)} />
          <button type="button" onClick={joinGame}>Go</button>
        </Row>
      )
    }
  </span>
);

const Icon = Styled.img`
  background-color: red;
  padding: 5px;
`;
const Text = Styled(Row)`
  border: 2px solid;
  color: black;
  background-color: red;
  margin-right: 10px;
  width: 200px;
  padding: 5px;
`;
const Form = Styled(Center)`
    margin: 5%;
    gap: 30px;
`;
const Image = Styled.img`
    margin-top: 5%;
    height: 30%;
    width: 50%;
`;
