import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { GlobalContext } from '../../store';
import socket from '../../util/socket.config';
import CrewManifest from '../../../Assets/CrewManifest.png';
// import Chat from '../Chat';

const Lobby = () => {
  const {
    players, setPlayers, player, gameID,
  } = useContext(GlobalContext);

  const [showChat, setShowChat] = useState(false);
  const [ canStart, setCanStart] = useState(false);

  useEffect(() => {
    socket.on('ready', (user) => {
      const playList = players.map((current) => {
        if (current.username === user.username) {
          return { ...current, status: !current.status };
        }
        return current;
      });
      setPlayers(playList);
      if (player.isHost) {
        setCanStart(playList.every((each) => each.status));
      }
    });
    // socket.on('start', () => 'add board component here');
    // });
  }, []);

  const readyUp = () => {
    socket.emit('ready', player, gameID);
  };
  const startGame = () => {
    socket.emit('start-game', player, gameID);
  };

  return (
    <Background>
      <Title>LOADING BAY</Title>
      <Row>
        <LeftColumn>
          <Img src={CrewManifest} alt="crew-manifest" />
          <ListCol>
            { players.map((each) => (
              <PlayerRow>
                <PlayerName key={each.id}>{each.username.slice(0, 10)}</PlayerName>
                <PlayerSelection backgroundColor={each.color}>O</PlayerSelection>
              </PlayerRow>
            ))}
          </ListCol>
          <Column>
            <CodeDiv>Room Code</CodeDiv>
            <LoadingButton color="grey" onClick={() => copy(gameID)} type="button">{gameID}</LoadingButton>
          </Column>
        </LeftColumn>

        <Column>
          <Placeholder />
          <LoadingButton onClick={readyUp} color="green" type="button">IM READY!</LoadingButton>
        </Column>

      </Row>

      <Row>
        {player.isHost && canStart ? <LoadingButton color="red" onClick={startGame} type="button">START GAME</LoadingButton> : null}
      </Row>

      {/* <Chat width="30em" height="350px" /> */}
    </Background>
  );
};

const Background = Styled.div`
  display: flex;
  flex-direction: column;
  background: #181818;
  height: 100vh;
  align-items: center;
`;

const Title = Styled.div`
  font-family: anotherDanger;
  color: red;
  font-size: 10vh;
`;

const PlayerRow = Styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  background-color: 'black';
  margin-bottom: 5px;
  width: 20rem;
  z-index: 100;
`;

const CodeDiv = Styled.div`
  z-index: 75;
  margin-bottom: 1.7em;

`;

const Column = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListCol = Styled(Column)`
  margin-top: 5.5em;
  background-color: black;
  z-index: 50;
`;

const LeftColumn = Styled(Column)`
  position: relative;
  width: 30rem;
  height: 100%;
`;

const Img = Styled.img`
  position: absolute;
  width: 100%;
`;

const Row = Styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  padding-top: 5vh;

`;

const LoadingButton = Styled.button`
  background-color: #232323;
  color:  ${(props) => props.color || '#E0E0E0'};
  font-size: 24px;
  border: none;
  box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
  width: 15rem;
  z-index: 75;
`;

const Placeholder = Styled.div`
  height: 50vh;
  width: 25rem;
  border: 2px solid red;
`;

const PlayerName = Styled.div`
  font-size: 2rem;
  letter-spacing: 4px;
`;

const PlayerSelection = Styled.div`
  font-size: 2rem;
  background-color: ${(props) => props.backgroundColor || 'white'},
  border-radius: 50%,
  border: 3px solid grey,
  width: 20px,
  height: 20px
`;

const PlayerStatus = Styled.div`
font-size: 2rem;`;
export default Lobby;
