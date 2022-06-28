import React, { useState, useEffect } from 'react';

// import { GlobalContext } from '../../../store/index';
import songURL from '../../../../assets/music/board/Track1.mp3';
import MuteButton from './muteButton';

const MusicPlayer = ({ height, width, id }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const volume = 0.1;
  const handleMuteClick = () => {
    document.getElementById('gameMusic').muted = isPlaying;
    document.getElementById('gameMusic').volume = volume;
    setIsPlaying((prev) => !prev);
  };
  // const helper = () => {
  //   console.log('helper ran');
  //   console.log(id);
  //   document.getElementById('gameMusic').play();
  // };
  // onMouseEnter={helper}
  return (
    <div className="music-player" position="fixed" height="100vh" z-index="100" width="100vh" >
      <audio preload="auto" id={id} display="hidden" autoPlay className="test" type="audio/mpeg">
        <track kind="captions" />
        <source preload="auto" src={songURL} type="audio/mpeg" />
      </audio>
      <MuteButton muteFunction={handleMuteClick} isPlaying={isPlaying} />
    </div>
  );
};

export default MusicPlayer;
