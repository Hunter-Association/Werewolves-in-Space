import React from 'react';
import styled from 'styled-components';
import { TextInput } from '../../../library';
import werewolf from '../../../../Assets/jessi-ochse-werewolf-removebg-preview.png';
import claws from '../../../../Assets/Werewolf Scratches.png';

const AuthForm = ({
  route, handleUserNameChange, handlePasswordChange, handleSubmit, displayWarning, signupWarning,
}) => (
  <>
    <LogoWrapper>
      <ClawMarks src={claws} alt="" />
      <WerewolfImg src={werewolf} alt="" />
      <GameName>WEREWOLVES IN SPACE</GameName>
    </LogoWrapper>

    <LoginForm onSubmit={handleSubmit}>

      <TextInput
        type="text"
        onChange={handleUserNameChange}
        spellcheck="false"
        placeholder="username"
        color="black"
      />

      <PasswordBox
        type="password"
        onChange={handlePasswordChange}
        placeholder="password"
        color="black"
      />

      {displayWarning && <Warn>Please enter a valid username or password</Warn>}
      {signupWarning && <Warn>Username already exists</Warn>}
      <LoginButton type="submit" value={route} />
    </LoginForm>
  </>
);

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Warn = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-style: italic;
  color: #d20000;
  margin-top: 6px;
`;

const GameName = styled.div`
  font-size: 70px;
  filter: drop-shadow(4px 4px 4px #0000009d);
`;

const ClawMarks = styled.img`
  max-width: 600px;
  position: absolute;
  top: 0;
`;

const WerewolfImg = styled.img`
  max-width: 300px;
  position: absolute;
  top: 25%;
  filter: drop-shadow(4px 4px 4px #0000009d);
`;

const LogoWrapper = styled.section`
  height: 550px;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LoginButton = styled.input`
  margin-top: 10px;
  font-size: 24px;
  background-image: url(${claws});
  background-color: transparent;
  background-size: 100%;
  color: white;
  height: 90px;
  width: 100px;
  border: none;
  cursor: pointer;
  letter-spacing: 4px;
  text-shadow: 2px 2px #00000051;
`;

const PasswordBox = styled(TextInput)`
  &:focus {
    font-family: Arial;
    outline: none;
  }
`;

export default AuthForm;
