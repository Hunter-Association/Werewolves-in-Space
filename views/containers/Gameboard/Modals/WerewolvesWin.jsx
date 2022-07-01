import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Center } from '../../../library';
import WerewolvesWinBG from '../../../../Assets/Werewolves Win Background.gif';
import WhiteReady from '../../../../Assets/WhiteReady.png';
import RedReady from '../../../../Assets/RedReady.png';

const wolvesWin = {
  overlay: {
    // width: '2',
    // height: '2px',
    border_radius: '10%',
    backgroundColor: 'rgb(19 18 18 / 75%)',
  },
  content: {
    height: '350px',
    width: '655px',
    border: '1px solid red',
    background: 'black',
    marginLeft: '15%',
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

const WerewolvesWin = () => {
  const title = 'werewolves win!!!';
  return (
    <Modal isOpen={true} style={wolvesWin} appElement={document.getElementById('root')}>
      <CrewModal>
        <Winner>{title}</Winner>
        <ImageLineUp>
          <LeftImage src={WhiteReady} alt="" />
          <RightImage src={RedReady} alt="" />
        </ImageLineUp>
        {/* <button type="button" onClick={toLobby}>New Game</button> */}
      </CrewModal>
    </Modal>
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
  opacity: '1',
`;

const ImageLineUp = styled(Center)`
  flex-direction: row;
  background-color: transparent;
`;

const LeftImage = styled.img`
  -webkit-transform: scaleX(-1);
  height: 300px;
`;

const RightImage = styled.img`
  height: 300px;
`;
