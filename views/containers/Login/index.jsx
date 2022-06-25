import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthForm from './components/AuthForm';
// import { GlobalContext } from '../../store';

const Login = () => {
  // const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSubmit = () => {
    console.log('submit');
  };

  const handleUsernameChange = (event) => {
    setLoginUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  return (
    <Background>
      <AuthForm route="Login" handleSubmit={handleSubmit} handleUserNameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} />
      <Link to="/signup">Signup</Link>
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

//= ======unique styling
export default Login;
