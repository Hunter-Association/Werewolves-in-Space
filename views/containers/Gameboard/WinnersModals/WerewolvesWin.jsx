import React from 'react';
import styled from 'styled-components';
import { Center } from '../../../library';
import WerewolvesWinBG from '../../../../Assets/Werewolves Win Background.gif';
import WhiteReady from '../../../../Assets/WhiteReady.png';
import RedReady from '../../../../Assets/RedReady.png';

const WerewolvesWin = () => {
  const title = 'werewolves win!!!';
  return (
    <CrewModal>
      <Winner>{title}</Winner>
      <ImageLineUp>
        <LeftImage src={WhiteReady} alt="" />
        <RightImage src={RedReady} alt="" />
      </ImageLineUp>
    </CrewModal>
  );
};

export default WerewolvesWin;

const Winner = styled.div`
  padding-top: 20px;
  font-size: 40px;
  letter-spacing: 4px;
  color: #D20000;
`;

const CrewModal = styled(Center)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 350px;
  width: 655px;
  background-color: ${(props) => props.backgroundColor || '#000000'};
  background-image: url(${WerewolvesWinBG});
`;

const ImageLineUp = styled(Center)`
  flex-direction: row;
  background-color: transparent;
`;

const LeftImage = styled.img`
  -webkit-transform: scaleX(-1);
  height: 300px;
  padding-right: 20px;
`;

const RightImage = styled.img`
  height: 300px;
  padding-right: 20px;
`;
