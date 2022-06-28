import React from 'react';
import styled, { keyframes } from 'styled-components';
import guy from '../../../Assets/characters/Adventurer_Run.png';

const Test = () => (
  // eslint-disable-next-line max-len
  <GUY />

);

const animation = keyframes`
  100% { background-position: -1025px; }
`;

const GUY = styled.div`
  height: 64px;
  width: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -25%);
  background: url(${guy}) left center;
  animation: ${animation} .8s steps(8) infinite;
`;

export default Test;
