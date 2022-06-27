import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { GlobalContext } from '../../../store';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import { Button } from '../../../library';

const Signup = () => {
  const navigate = useNavigate();
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupWarning, setSignupWarning] = useState(false);

  const signup = () => axios({
    method: 'post',
    data: {
      username: signupUsername,
      password: signupPassword,
    },
    withCredentials: true,
    url: '/authentication/signup',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup()
      .then((response) => {
        console.log(response.data);
        if (response.data === 'User created') {
          navigate('/');
        } else {
          setSignupWarning(true);
        }
      });
  };

  const handleUsernameChange = (event) => {
    setSignupUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setSignupPassword(event.target.value);
  };

  return (
    <Background>
      <AuthForm route="Signup" handleSubmit={handleSubmit} handleUserNameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} signupWarning={signupWarning} />

      <Link to="/"><Button>Login</Button></Link>
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
  justify-content: space-around;
  align-items: center;
`;

export default Signup;
