import React, { useState, useEffect } from 'react';

// import { GlobalContext } from '../../../store/index';
// import songURL from '../../../../assets/music/board/Track1.mp3';
import MuteButton from './muteButton';

<<<<<<< HEAD
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
=======
// const MusicPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(true);
//   const volume = 0.2;
//   const handleMuteClick = () => {
//     setIsPlaying((prev) => !prev);
//     // document.getElementById('gameMusic').muted = !isPlaying;
//     // document.getElementById('gameMusic').volume = volume;
//   };

//   useEffect(() => {
//     document.getElementById('gameMusic').muted = !isPlaying;
//     document.getElementById('gameMusic').volume = volume;
//   });

//   return (
//     <div className="music-player">
//       <audio preload="auto" id="gameMusic" display="hidden" autoPlay className="test" type="audio/mpeg">
//         <track kind="captions" />
//         <source preload="auto" src={songURL} type="audio/mpeg" />
//       </audio>
//       <MuteButton muteFunction={handleMuteClick} isPlaying={isPlaying} />
//     </div>
//   );
// };
>>>>>>> 6d8793eb8e4a6aa73599b2298d642e10ab752999

// export default MusicPlayer;
