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
    };
    this.readyUp = this.readyUp.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    const players = this.state;
    for (let i = 0; i < { players }.length; i += 1) {
      var player = players[i];
      this.setState({
        player.playerColor: 'none',
        playerStatus: false,
      });
    }
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
    const { players } = this.state;
    return (
      <>
        <List
          players={players}
        />
        <button onClick={this.readyUp} type="submit">READY UP!</button>
        <button onClick={this.startGame} type="submit">START GAME</button>
      </>
    );
  }
}

export default Lobby;
