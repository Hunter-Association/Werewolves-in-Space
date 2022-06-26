import React from 'react';
import styled from 'styled-components';
import { TextInput, Submit } from '../../../library';

const AuthForm = ({
  route, handleUserNameChange, handlePasswordChange, handleSubmit,
}) => (
  <LoginForm onSubmit={handleSubmit}>

    <TextInput type="text" onChange={handleUserNameChange} placeholder="username" />

    <TextInput type="text" onChange={handlePasswordChange} placeholder="password" />

    <Submit type="submit" value={route} />
  </LoginForm>
);

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default AuthForm;
