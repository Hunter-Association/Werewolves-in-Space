import React from 'react';
import styled from 'styled-components';

const AuthForm = ({
  route, handleUserNameChange, handlePasswordChange, handleSubmit,
}) => (
  <LoginForm onSubmit={handleSubmit}>

    <input type="text" onChange={handleUserNameChange} placeholder="username" />

    <input type="text" onChange={handlePasswordChange} placeholder="password" />

    <input type="submit" value={route} />
  </LoginForm>
);

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default AuthForm;
