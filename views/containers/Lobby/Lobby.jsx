import React from 'react';
import List from './List';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{
        username: 'user1', isDead: false, isWolf: false, socket: {}, id: '',
      }, {
        username: 'user2', isDead: false, isWolf: false, socket: {}, id: '',
      }, {
        username: 'user3', isDead: false, isWolf: false, socket: {}, id: '',
      }, {
        username: 'user4', isDead: false, isWolf: false, socket: {}, id: '',
      }],
      playerColor: 'none',
      playerStatus: false,

    };
    this.readyUp = this.readyUp.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  readyUp() {
    this.setState({
      playerStatus: true,
    });
  }

  startGame() {
    return 'add function that starts the game';
  }

  render() {
    const { players, playerColor, playerStatus } = this.state;
    return (
      <>
        <List
          players={players}
          color={playerColor}
          status={playerStatus}
        />
        <button onClick={this.readyUp} type="submit">READY UP!</button>
        <button onClick={this.startGame} type="submit">START GAME</button>
      </>
    );
  }
}

export default Lobby;
