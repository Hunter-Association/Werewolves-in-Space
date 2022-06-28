import { Link } from 'react-router-dom';
import React from 'react';
import MusicPlayer from './components/musicPlayer';

const Gameboard = () => (
  <div>
    <p>Welcome to the board.</p>
    <Link to="/">
      <div>Back to home</div>
    </Link>
    <MusicPlayer />
  </div>
);
export default Gameboard;
