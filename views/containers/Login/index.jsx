/* eslint-disable no-underscore-dangle */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styled from 'styled-components';
import axios from 'axios';
import AuthForm from './components/AuthForm';
// import io from 'socket.io-client';
import { GlobalContext } from '../../store';
import { Button, Center } from '../../library';

const Login = () => {
  const navigate = useNavigate();
  const { setPlayer, setSessionData } = useContext(GlobalContext);
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
              setPlayer({
                username: res.data.user.username,
                isDead: false,
                isWolf: false,
                socket: {},
                id: res.data.user._id,
              });
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
    <Center>
      <AuthForm route="Login" handleSubmit={handleSubmit} handleUserNameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} displayWarning={displayWarning} />

      <Link to="/signup"><BottomButton backgroundColor="red">Signup</BottomButton></Link>
      <Link to="/board"> Board </Link>
    </Center>
  );
};

//= ======Move to seperate
// const Background = styled.div`
//   background: black;
//   width: 45em;
//   height: 50em;
//   border-radius: 25px;
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
// `;

//= ======unique styling
const BottomButton = Styled(Button)`
  margin-top: 15vh
`;

export default Login;
