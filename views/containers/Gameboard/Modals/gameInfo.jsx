import React, { useState } from 'react';
import Styled from 'styled-components';
import Modal from 'react-modal';

const infoStyle = {
  overlay: {
    width: '2',
    height: '2px',
    border_radius: '10%',
    backgroundColor: 'rgb(19 18 18 / 75%)',
  },
  content: {
    width: '450px',
    height: '460px',
    border: '1px solid red',
    background: 'black',
    marginLeft: '25%',
    marginTop: '7%',
    inlet: '0%',
    border_radius: '10%',
  },
};

const GameInfo = () => (
    <Modal isOpen={true} style={infoStyle} appElement={document.getElementById('root')}>
      <InfoContainer>
        <InfoHeaders>How To Play as Colonist</InfoHeaders>
        <InfoDivs>*Click on who you suspect is the werewolf.</InfoDivs>
        <InfoDivs>*Click “Lock In” to lock in your vote.</InfoDivs>
        <InfoDivs>*Vote out all of the werewolves to win!</InfoDivs>
        <InfoHeaders>How To Play as Werewolf</InfoHeaders>
        <InfoDivs>*Vote accordingly to deceive colonists.</InfoDivs>
        <InfoDivs>*Click on the colonist you want to eat.</InfoDivs>
        <InfoDivs>*Click “Lock In” to lock in your vote.</InfoDivs>
        <InfoDivs>*Kill all of the colonists to win!</InfoDivs>
      </InfoContainer>
    </Modal>
);

export default GameInfo;

const InfoContainer = Styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  justify-content: center;
  align-items: center;
`;

const InfoDivs = Styled.div`
  margin-top:3%;
  letter-spacing: 2px;
`;

const InfoHeaders = Styled.h4`
  font-size: x-large;
  margin-top: 4%;
  color: red;
  letter-spacing: 2px;
`;

const InfoClose = Styled.button`
  margin-top: 10%;
  width: 200px;
  letter-spacing: 2px;
`;
