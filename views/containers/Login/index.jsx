import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import AuthForm from './components/AuthForm';
// import io from 'socket.io-client';
import { GlobalContext } from '../../store';
import { Button } from '../../library';

const Login = () => {
  const navigate = useNavigate();
  const { setUserData, setSessionData } = useContext(GlobalContext);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [displayWarning, setDisplayWarning] = useState(false);

  const login = () => axios({
    method: 'post',
    data: {
      username: loginUsername,
      password: loginPassword,
    },
    withCredentials: true,
    url: '/authentication/login',
  });

  const getUser = () => axios({
    method: 'get',
    withCredentials: true,
    url: '/authentication/user',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login()
      .then((response) => {
        if (response.data === 'No User Exists') {
          setDisplayWarning(true);
        } else {
          getUser()
            .then((res) => {
              setUserData(res.data.user);
              setSessionData(res.data.session);
            })
            .then(navigate('/home'));
        }
      });
  };

  const handleUsernameChange = (event) => {
    setLoginUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  return (
    <Background>
      <AuthForm route="Login" handleSubmit={handleSubmit} handleUserNameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} displayWarning={displayWarning} />

      <Link to="/signup"><Button>Signup</Button></Link>
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

//= ======unique styling
export default Login;
