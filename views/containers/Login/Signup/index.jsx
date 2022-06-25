import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { GlobalContext } from '../../../store';
import AuthForm from '../components/AuthForm';

const Signup = () => {
  // const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleSubmit = () => {
    console.log('submit');
  };

  const handleUsernameChange = (event) => {
    setSignupUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setSignupPassword(event.target.value);
  };

  return (
    <Background>
      <AuthForm route="Signup" handleSubmit={handleSubmit} handleUserNameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} />
      <Link to="/">Login</Link>
    </Background>
  );
};

//= ======Move to seperate
const Background = styled.div`
  background: black;
  width: 45em;
  height: 50em;
  border-radius: 25px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justifty-content: space-around;
  align-items: center;
`;

export default Signup;
