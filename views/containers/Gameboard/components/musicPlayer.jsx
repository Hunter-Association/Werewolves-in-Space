import React, { useState, useEffect } from 'react';

// import { GlobalContext } from '../../../store/index';
import songURL from '../../../../assets/music/board/Track1.mp3';
import MuteButton from './muteButton';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const volume = 0.2;
  const handleMuteClick = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    document.getElementById('gameMusic').volume = volume;
  }, []);

  return (
    <div className="music-player">
      <audio id="gameMusic" muted={!isPlaying} autoPlay className="test" type="audio/mpeg">
        <track kind="captions" />
        <source src={songURL} />
      </audio>
      <MuteButton muteFunction={handleMuteClick} isPlaying={isPlaying} />
    </div>
  );
};

export default MusicPlayer;
