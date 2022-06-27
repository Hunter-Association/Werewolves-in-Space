import React from 'react';
// import { GlobalContext } from '../../../store/index';

import song from '../../../../assets/music/board/Track1.mp3';
import MuteButton from './muteButton';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    const { isSoundEnabled } = this.props;
    this.sound = new Audio(song);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.handleMuteClick = this.handleMuteClick.bind(this);
    this.state = {
      isPlaying: false,
      globalSoundAllowed: isSoundEnabled,
    };
    this.sound.pause();
  }

  componentWillUnmount() {
    this.sound.pause();
  }

  handleMuteClick() {
    const { isPlaying, globalSoundAllowed } = this.state;
    if (isPlaying) {
      this.stopSound();
      this.setState((prevState) => {
        let newState = {};
        newState = Object.assign(prevState);
        newState.isPlaying = !newState.isPlaying;
        return newState;
      });
    } else if (globalSoundAllowed) {
      this.playSound();
      this.setState((prevState) => {
        let newState = {};
        newState = Object.assign(prevState);
        newState.isPlaying = !newState.isPlaying;
        return newState;
      });
    }
  }

  playSound() {
    this.sound.play();
  }

  stopSound() {
    this.sound.pause();
  }

  render() {
    const { isPlaying } = this.state;
    return (
      <div className="music-player">
        <MuteButton muteFunction={this.handleMuteClick} isPlaying={isPlaying} />
      </div>
    );
  }
}

export default MusicPlayer;
