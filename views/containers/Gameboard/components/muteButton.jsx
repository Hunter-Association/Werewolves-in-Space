// import { Link } from 'react-router-dom';
import React from 'react';
import Styled from 'styled-components';

import MuteIcon from '../../../../assets/img/sound/mute.svg';
import UnmuteIcon from '../../../../assets/img/sound/unmute.svg';

const MuteButton = ({ muteFunction, isPlaying }) => {
  const xl = {
    position: 'absolute',
    height: '100px',
    width: '100px',
    right: '15px',
    top: '15px',
    color: 'grey',
    zIndex: 2,
  };

  const l = Object.assign(xl);
  l.height = '75px';
  l.width = '75px';

  if (isPlaying) {
    return (
      <div>
        <Icon src={UnmuteIcon} style={l} alt="unmuteIcon" onClick={() => { muteFunction(); }} />
      </div>
    );
  }
  return (
    <div>
      <Icon src={MuteIcon} style={l} alt="muteIcon" onClick={() => { muteFunction(); }} />
    </div>
  );
};

export default MuteButton;

const Icon = Styled.img`

`;
