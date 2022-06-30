import React, { useState, useEffect } from 'react';

// import { GlobalContext } from '../../../store/index';
import songURL from '../../../../assets/music/board/Track2.mp3';
import MuteButton from './muteButton';
// import MusicHelper from './musicHelper';

const MusicPlayer = ({ height, width, id='gameMusic' }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const volume = 0.1;
  const handleMuteClick = () => {
    document.getElementById('gameMusic').muted = isPlaying;
    document.getElementById('gameMusic').volume = volume;
    setIsPlaying((prev) => !prev);
  };
  const helper = () => {
    console.log('helper ran');
    console.log(id);
    document.getElementById('gameMusic').mute;
  };

  return (
    <div className="music-player" position="fixed">
      <audio preload="auto" id={id} display="hidden" autoPlay muted loop className="gameMusic" type="audio/mpeg">
        <track kind="captions" />
        <source preload="auto" src={songURL} type="audio/mpeg" />
      </audio>
      {/* <MusicHelper startMusic={helper}></MusicHelper> */}
      <MuteButton muteFunction={handleMuteClick} isPlaying={isPlaying} />
    </div>
  );
};

export default MusicPlayer;
