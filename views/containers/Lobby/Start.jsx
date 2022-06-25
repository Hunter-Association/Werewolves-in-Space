import React from 'react';
import Players from './Players';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hosting: false,
      joining: false,
    };
    this.host = this.host.bind(this);
    this.join = this.join.bind(this);
  }

  host() {
    this.setState({
      hosting: true,
    });
  }

  join() {
    this.setState({
      joining: true,
    });
  }

  render() {
    const { hosting, joining } = this.state;
    return (
      <>
        <button onClick={this.host} type="button">Host Game</button>
        {hosting ? <input placeholder="Name" /> : null}
        <button onClick={this.join} type="button">Join Game</button>
        {joining ? <input placeholder="Name" /> : null}
        {joining ? <input placeholder="Game Code" /> : null}
        <button type="button">OK</button>
        <Players />
      </>
    );
  }
}

export default Start;
