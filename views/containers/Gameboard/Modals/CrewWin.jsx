import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Center } from '../../../library';
import CrewWins from '../../../../Assets/CrewWins.jpeg';
import AdventurerWalk from '../../../../Assets/Adventurer_Walk.png';
import AdventureGirlWalk from '../../../../Assets/AdventureGirl_Walk.png';
import DoctorWalk from '../../../../Assets/Doctor_Walk.png';

const crewWin = {
  overlay: {
    // width: '2',
    // height: '2px',
    border_radius: '10%',
    backgroundColor: 'rgb(19 18 18 / 75%)',
  },
  content: {
    height: '450px',
    width: '1050px',
    border: '1px solid red',
    background: 'black',
    marginLeft: '18%',
    marginTop: '7%',
    inlet: '0%',
    border_radius: '10%',
    overflow: 'hidden',
  },
};

const toLobby = () => {
  const navigate = useNavigate();
  navigate('/home');
};

const CrewWin = () => {
  const title = 'crew win!!!';
  return (
    <Modal isOpen={true} style={crewWin} appElement={document.getElementById('root')}>
      <CrewModal>
        <Winner>{title}</Winner>
        <ImageLineUp>
          <CharImage src={AdventurerWalk} alt="" />
          <CharImage src={AdventureGirlWalk} alt="" />
          <CharImage src={DoctorWalk} alt="" />
        </ImageLineUp>
        {/* <button type="button" onClick={toLobby}>New Game</button> */}
      </CrewModal>
    </Modal>
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
