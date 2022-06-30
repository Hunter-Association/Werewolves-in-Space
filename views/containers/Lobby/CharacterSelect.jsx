import React, { useState } from 'react';
import Styled, { keyframes } from 'styled-components';

// static images
import singleAdventureGirl from '../../../Assets/characters/singleAdventureGirl.png';
import singleAgent from '../../../Assets/characters/singleAgent.png';
import singleCyberpunk from '../../../Assets/characters/singleCyberpunk.png';
import singleSoldier from '../../../Assets/characters/singleFutureSoldier.png';
import singleNormalGirl from '../../../Assets/characters/singleNormalGirl.png';
// import { GlobalContext } from '../../store';

// gifs
import adventureGirl from '../../../Assets/characters/AdventureGirl_Talking.png';
import agent from '../../../Assets/characters/Agent_Talking.png';
import cyberpunk from '../../../Assets/characters/CyberPunk_Talking.png';
import soldier from '../../../Assets/characters/FutureSoldier_Talking.png';
import normalGirl from '../../../Assets/characters/NormalGirl_Talking.png';

import characterBios from '../../../Assets/characters/characterBios';

const CharacterSelect = ({ currentCharacter, setCurrentCharacter }) => {
  // const { characterList } = useContext(GlobalContext);
  const [characterList, setCharacterList] = useState(
    [adventureGirl, agent, cyberpunk, soldier, normalGirl],
  );

  const nextCharacterLeft = () => {
    if (currentCharacter !== 0) {
      setCurrentCharacter(currentCharacter - 1);
    } else {
      setCurrentCharacter(characterList.length - 1);
    }
  };

  const nextCharacterRight = () => {
    if (currentCharacter !== characterList.length - 1) {
      setCurrentCharacter(currentCharacter + 1);
    } else {
      setCurrentCharacter(0);
    }
  };

  let characterImage;
  if (currentCharacter === 0) { characterImage = <AdventureGirlStyle />; }
  if (currentCharacter === 1) { characterImage = <AgentStyle />; }
  if (currentCharacter === 2) { characterImage = <CyberpunkStyle />; }
  if (currentCharacter === 3) { characterImage = <SoldierStyle />; }
  if (currentCharacter === 4) { characterImage = <NormalGirlStyle />; }

  return (
    <Big>
      {/* <CharacterHeader>Character Select</CharacterHeader> */}
      <CharactersOverview>
        <CharacterImagePreview src={singleAdventureGirl} alt="adventureGirl preview" />
        <CharacterImagePreview src={singleAgent} alt="agent preview" />
        <CharacterImagePreview src={singleCyberpunk} alt="cyberpunk preview" />
        <CharacterImagePreview src={singleSoldier} alt="soldier preview" />
        <CharacterImagePreview src={singleNormalGirl} alt="normalGirl preview" />
      </CharactersOverview>

      <Row>
        <ButtonLeft onClick={() => nextCharacterLeft()} />
        <CenterDiv>
          {/* <CharacterImage src={characterList[currentCharacter]} alt={currentCharacter} /> */}
          {characterImage}
          <CharacterText>{characterBios[currentCharacter]}</CharacterText>
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
  width: 250px;
  height: 350px;

`;

// const CharacterHeader = Styled.h2`
//   text-align:center;
// `;

const CharacterText = Styled.div`
  overflow-wrap: break-word;
  text-align: center;
  font-size: 12px;
  letter-spacing: 2px;
`;

const CharactersOverview = Styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`;

const animation = keyframes`
  100% { background-position: -1025px; }
`;

const SoldierStyle = Styled.div`
  height: 64px;
  width: 50px;
  transform: scale(3);
  margin-top: 80px;
  margin-bottom: 100px;
  margin-right: 30px;
  background: url(${soldier}) left center;
  animation: ${animation} 2s steps(8) infinite;
  `;

const AdventureGirlStyle = Styled.div`
height: 64px;
width: 50px;
transform: scale(3);
margin-top: 80px;
margin-bottom: 100px;
margin-right: 30px;
background: url(${adventureGirl}) left center;
animation: ${animation} 2s steps(8) infinite;
`;
const AgentStyle = Styled.div`
height: 64px;
width: 50px;
transform: scale(3);
margin-top: 80px;
margin-bottom: 100px;
margin-right: 30px;
background: url(${agent}) left center;
animation: ${animation} 2s steps(8) infinite;
`;

const CyberpunkStyle = Styled.div`
height: 64px;
width: 50px;
transform: scale(3);
margin-top: 80px;
margin-bottom: 100px;
margin-right: 30px;
background: url(${cyberpunk}) left center;
animation: ${animation} 2s steps(8) infinite;
`;

const NormalGirlStyle = Styled.div`
height: 64px;
width: 50px;
transform: scale(3);
margin-top: 80px;
margin-bottom: 100px;
margin-right: 30px;
background: url(${normalGirl}) left center;
animation: ${animation} 2s steps(8) infinite;
`;
