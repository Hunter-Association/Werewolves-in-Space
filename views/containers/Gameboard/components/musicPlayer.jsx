import React, { useState, useEffect } from 'react';

// import { GlobalContext } from '../../../store/index';
import songURL from '../../../../assets/music/board/Track1.mp3';
import MuteButton from './muteButton';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const volume = 0.2;
  const handleMuteClick = () => {
    setIsPlaying((prev) => !prev);
    // document.getElementById('gameMusic').muted = !isPlaying;
    // document.getElementById('gameMusic').volume = volume;
  };

  useEffect(() => {
    document.getElementById('gameMusic').muted = !isPlaying;
  });

  return (
    <div className="music-player">
      <audio preload="auto" id="gameMusic" display="hidden" autoPlay className="test" type="audio/mpeg">
        <track kind="captions" />
        <source src={songURL} type="audio/mpeg" />
      </audio>
      <MuteButton muteFunction={handleMuteClick} isPlaying={isPlaying} />
    </div>
  );
};

export default MusicPlayer;
