import React, { useContext, useState } from 'react';
// import copy from 'copy-to-clipboard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  Button, Center, Column, TextInput,
} from '../../library';
import { GlobalContext } from '../../store';
import socket from '../../util/socket.config';
import claws from '../../../Assets/Werewolf Scratches.png';
// import clipboard from '../../../Assets/clipboard2-plus-fill.svg';

const Home = () => {
  const {
    gameID,
    setGameID,
    player,
    setPlayer,
    players,
    setPlayers,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [showJoinOptions, setShowJoinOptions] = useState(true);
  const hostGame = () => {
    socket.on('player-joined', (allPlayers) => {
      setPlayers(allPlayers);
    });
    const uid = uuidv4().slice(0, 5);
    socket.emit('join-game', uid, player);
    setGameID(uid);
    setPlayer((prev) => ({ ...prev, isHost: true }));
    navigate('/lobby');
  };

  const joinGame = () => {
    socket.on('player-joined', (allPlayers) => {
      setPlayers(allPlayers);
    });
    socket.emit('join-game', gameID, player);
    navigate('/lobby');
  };

  // const joinHandler = () => {
  //   setShowJoinOptions((prev) => !prev);
  // };

  return (
    <Center backgroundColor="#181818">
      <HomeSection>
        <GameName>werewolves in space</GameName>
        <Form backgroundColor="#181818">
          <Button onClick={hostGame} backgroundColor="#D20000">Host Game</Button>
          {/* <Button onClick={joinHandler} backgroundColor="#D20000">Join Game</Button> */}
          <JoinOptions show={showJoinOptions} changeText={setGameID} joinGame={joinGame} />
        </Form>
      </HomeSection>
    </Center>
  );
};
export default Home;

// const HostOptions = ({ show, joinGame, gameID }) => {
//   const [copied, setCopied] = useState(false);
//   return (
//     <span>
//       {
//       show && (
//       <Row justify="space-between" align="center">
//         <Text
//           justify="space-between"
//           align="center"
//           onClick={() => {
//             copy(gameID);
//             setCopied((prev) => !prev);
//           }}
//         >
//           {gameID}
//           <Icon src={clipboard} alt="clipboard" />
//         </Text>
//         <button type="button" onClick={joinGame}>Go</button>
//       </Row>
//       )
//       }
//     </span>
//   );
// };
const JoinOptions = ({ show, joinGame, changeText }) => (
  <span>
    {
      show && (
        <Column>
          <GameCode type="text" placeholder="Enter Game Code" onChange={(e) => changeText(e.target.value)} />
          {/* <button type="button" onClick={joinGame}>Go</button> */}
          <GameCodeDiv><LoginButton type="button" value="Join Game" onClick={joinGame} /></GameCodeDiv>
        </Column>
      )
    }
  </span>
);

// const Icon = styled.img`
//   background-color: red;
//   padding: 5px;
// `;

// const Text = styled(Row)`
//   border: 2px solid;
//   color: black;
//   background-color: red;
//   margin-right: 10px;
//   width: 200px;
//   padding: 5px;
// `;

const Form = styled(Center)`
  margin: 5%;
  gap: 30px;
`;

const GameName = styled.div`
  font-size: 70px;
  filter: drop-shadow(4px 4px 4px #0000009d);
`;

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  width: 700px;
`;

const GameCode = styled(TextInput)`
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 2px solid grey;
  border-radius: 0px;
  filter: drop-shadow(4px 4px 4px #0000009d);
  box-shadow: none;
`;

const LoginButton = styled.input`
  margin-top: 5px;
  font-size: 24px;
  background-image: url(${claws});
  background-color: transparent;
  background-size: 100%;
  color: white;
  height: 90px;
  width: 100px;
  border: none;
  cursor: pointer;
  letter-spacing: 4px;
  text-shadow: 2px 2px #00000051;
  white-space: normal;
`;

const GameCodeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
