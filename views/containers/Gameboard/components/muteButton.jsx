// import { Link } from 'react-router-dom';
import React from 'react';
// import styled from 'styled-components';

import MuteIcon from '../../../../assets/img/sound/mute.svg';
import UnmuteIcon from '../../../../assets/img/sound/unmute.svg';

const MuteButton = ({ muteFunction, isPlaying }) => {
  const xl = {
    position: 'absolute',
    height: '100px',
    width: '100px',
    right: 0,
    top: 0,
    fill: 'grey',
    zIndex: 2,
  };

  const l = Object.assign(xl);
  l.height = '75px';
  l.width = '75px';

  if (isPlaying) {
    return (
      <div>
        <UnmuteIcon style={l} onClick={() => { muteFunction(); }} />
      </div>
    );
  }
  return (
    <div>
      <MuteIcon style={l} onClick={() => { muteFunction(); }} />
    </div>
  );
};

export default MuteButton;
