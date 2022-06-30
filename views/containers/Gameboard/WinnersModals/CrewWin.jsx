import React from 'react';
import styled from 'styled-components';
import { Center } from '../../../library';
import CrewWins from '../../../../Assets/CrewWins.jpeg';
import AdventurerWalk from '../../../../Assets/Adventurer_Walk.png';
import AdventureGirlWalk from '../../../../Assets/AdventureGirl_Walk.png';
import DoctorWalk from '../../../../Assets/Doctor_Walk.png';

const CrewWin = () => {
  const title = 'crew win!!!';
  return (
    <CrewModal>
      <Winner>{title}</Winner>
      <ImageLineUp>
        <CharImage src={AdventurerWalk} alt="" />
        <CharImage src={AdventureGirlWalk} alt="" />
        <CharImage src={DoctorWalk} alt="" />
      </ImageLineUp>
    </CrewModal>
  );
};

export default CrewWin;

const Winner = styled.div`
  padding-top: 10px;
  font-size: 60px;
  letter-spacing: 4px;
`;

const CrewModal = styled(Center)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  width: 1012px;
  background-color: ${(props) => props.backgroundColor || '#000000'};
  background-image: url(${CrewWins});
`;

const ImageLineUp = styled(Center)`
  flex-direction: row;
  background-color: transparent;
`;

const CharImage = styled.img`
  height: 150px;
  padding-right: 20px;
`;
