import React, { useState, useContext, useEffect } from 'react';
import Styled from 'styled-components';

import soldier from '../../../Assets/singleFutureSoldier.png';

const CharacterSelect = () => {
  const [currentCharcter, setCurrentCharacter] = useState(0);
  const [characterList, setCharacterList] = useState(['red', 'blue', 'green']);

  const i = 'this is the charcter bio. he is the super soldier that has the ability to hunt the werewolves in space!';
  return (
    <Big>
      <CharacterHeader>Character Select</CharacterHeader>
      <CharactersOverview>
        <CharacterImagePreview src={soldier} alt="crew pic preview" />
        <CharacterImagePreview src={soldier} alt="crew pic preview" />
        <CharacterImagePreview src={soldier} alt="crew pic preview" />
      </CharactersOverview>

      <Row>
        <ButtonLeft onClick={() => setCurrentCharacter(characterList[currentCharcter - 1])} />
        <CenterDiv>
          <CharacterImage src={soldier} alt="crew pic" />
          <CharacterText>{i}</CharacterText>
        </CenterDiv>
        <ButtonRight onClick={() => setCurrentCharacter(characterList[currentCharcter + 1])} />
      </Row>
    </Big>
  );
};

export default CharacterSelect;

const Big = Styled.div`
  height: 50vh;
  width: 25rem;
  border: 2px solid red;
`;

const Row = Styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CharacterImage = Styled.img`
  height: 275px;
  width: 225px;
`;

const CharacterImagePreview = Styled.img`
  max-height: 50px;
  max-width: 50px;
`;

const ButtonRight = Styled.div`
width: 0;
height: 0;
border-top: 20px solid transparent;
border-bottom: 20px solid transparent;
border-left: 20px solid red;
margin: auto;
`;

const ButtonLeft = Styled.div`
width: 0;
height: 0;
border-top: 20px solid transparent;
border-bottom: 20px solid transparent;
border-right:20px solid red;
margin: auto;
  &:hover {
    border-right: 20px dashed red;
  }
`;

const CenterDiv = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
`;

const CharacterHeader = Styled.h2`
  text-align:center;
`;

const CharacterText = Styled.p`
  overflow-wrap: break-word;
  text-align:center;
`;

const CharactersOverview = Styled.div`
  border: 1px solid pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;