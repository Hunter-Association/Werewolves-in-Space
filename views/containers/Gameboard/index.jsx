import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import MusicPlayer from './components/musicPlayer';
import { GlobalContext } from '../../store';

const Gameboard = () =>
// player.play('../../../public/assets/music/board/Track1.mp3', (err) => {
//   if (err) throw err;
// });
// constructor() {
//   super();
//   this.sound = new Audio(song);
//   this.playSound = this.playSound.bind(this);
//   this.stopSound = this.stopSound.bind(this);
//   this.handleMuteClick = this.handleMuteClick.bind(this);
//   this.state = {
//     isPlaying: false,
//   };
//   this.sound.pause();
// }

// componentWillUnmount() {
//   this.sound.pause();
// }

// handleMuteClick() {
//   gContext = useContext(GlobalContext);
//   const { isPlaying } = this.state;
//   if (isPlaying) {
//     this.stopSound();
//     this.setState((prevState) => {
//       let newState = {};
//       newState = Object.assign(prevState);
//       newState.isPlaying = !newState.isPlaying;
//       return newState;
//     });
//   } else if (!gContext.isSoundEnabled) {
//     this.playSound();
//     this.setState((prevState) => {
//       let newState = {};
//       newState = Object.assign(prevState);
//       newState.isPlaying = !newState.isPlaying;
//       return newState;
//     });
//   }
// }

// playSound() {
//   console.log('play sound func ran');
//   this.sound.play();
// }

// stopSound() {
//   console.log('stop sound func ran');
//   this.sound.pause();
// }
  (
    <div>
      <p>Welcome to the board.</p>
      <Link to="/">
        <div>Back to home</div>
      </Link>
      <MusicPlayer />
    </div>
  );
export default Gameboard;
