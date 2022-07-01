import React from 'react';
import Styled from 'styled-components';
import './spotlight.css';
const Spotlight = ({theStyle}) => {

  theStyle['box-shadow'] = '-5px 5px 39px 20px red';
  theStyle['height'] = '25px';
  theStyle['animation'] = 'myAnim 2s ease 0s infinite normal forwards';
  theStyle['border-radius'] = '100%';
  theStyle['display'] = 'inline-block';
  theStyle['width'] = '100%';
  theStyle['position'] = 'absolute';
  theStyle['bottom'] = '2%';
  theStyle['left'] = '0';
  theStyle['z-index'] = '0';
  return (
    <span class="dot" style={theStyle}></span>
  );
};

export default Spotlight;

// const Dot = Styled.span`
//     box-shadow: -5px 5px 39px 20px red;
//     height: 25px;
//     width: ${theStyle.width};
//     position: ${theStyle.position};
//     bottom: ${theStyle.bottom};
//     left: ${theStyle.left};
//     animation: myAnim 2s ease 0s infinite normal forwards;
//     background-color: clear;
//     border-radius: 100%;
//     display: inline-block;

// `;
