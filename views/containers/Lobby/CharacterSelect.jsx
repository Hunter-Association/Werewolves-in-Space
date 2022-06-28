import React, { useState, useContext, useEffect } from 'react';
import Styled from 'styled-components';

import adventureGirl from '../../../Assets/characters/singleAdventureGirl.png';
import agent from '../../../Assets/characters/singleAgent.png';
import cyberpunk from '../../../Assets/characters/singleCyberpunk.png';
import soldier from '../../../Assets/characters/singleFutureSoldier.png';
import normalGirl from '../../../Assets/characters/singleNormalGirl.png';

const CharacterSelect = () => {
  const [currentCharcter, setCurrentCharacter] = useState(3);
  const [characterList, setCharacterList] = useState(
    [adventureGirl, agent, cyberpunk, soldier, normalGirl],
  );
  const i = `    this is the charcter bio. he is the super soldier that has the ability to hunt the werewolves in space!
  testing for a longer string and to make sure the text doesnt go past testing 4 lines ahahasdlf`;

  const nextCharacterLeft = () => {
    if (currentCharcter !== 0) {
      setCurrentCharacter(currentCharcter - 1);
    } else {
      setCurrentCharacter(characterList.length - 1);
    }
  };

  const nextCharacterRight = () => {
    if (currentCharcter !== characterList.length - 1) {
      setCurrentCharacter(currentCharcter + 1);
    } else {
      setCurrentCharacter(0);
    }
  };

  return (
    <Big>
      {/* <CharacterHeader>Character Select</CharacterHeader> */}
      <CharactersOverview>
        <CharacterImagePreview src={adventureGirl} alt="adventureGirl preview" />
        <CharacterImagePreview src={agent} alt="agent preview" />
        <CharacterImagePreview src={cyberpunk} alt="cyberpunk preview" />
        <CharacterImagePreview src={soldier} alt="soldier preview" />
        <CharacterImagePreview src={normalGirl} alt="normalGirl preview" />
      </CharactersOverview>

      <Row>
        <ButtonLeft onClick={() => nextCharacterLeft()} />
        <CenterDiv>
          <CharacterImage src={characterList[currentCharcter]} alt={currentCharcter} />
          <CharacterText>{i}</CharacterText>
        </CenterDiv>
        <ButtonRight onClick={() => nextCharacterRight()} />
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
  height: 280px;
  width: 200px;
`;

const CharacterImagePreview = Styled.img`
  max-height: 75px;
  max-width: 75px;
`;

const ButtonRight = Styled.div`
width: 0;
height: 0;
border-top: 20px solid transparent;
border-bottom: 20px solid transparent;
border-left: 20px solid red;
margin: 10px;
`;

const ButtonLeft = Styled.div`
width: 0;
height: 0;
border-top: 20px solid transparent;
border-bottom: 20px solid transparent;
border-right:20px solid red;
margin: 10px;
`;

const CenterDiv = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid blue;
`;

// const CharacterHeader = Styled.h2`
//   text-align:center;
// `;

const CharacterText = Styled.div`
  overflow-wrap: break-word;
  text-align: center;
  font-size: 12px;
`;

const CharactersOverview = Styled.div`
  border: 1px solid pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;
