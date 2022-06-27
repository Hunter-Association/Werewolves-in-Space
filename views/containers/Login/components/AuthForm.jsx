import React from 'react';
import styled from 'styled-components';
import { TextInput, Submit } from '../../../library';

const AuthForm = ({
  route, handleUserNameChange, handlePasswordChange, handleSubmit, displayWarning, signupWarning,
}) => (
  <LoginForm onSubmit={handleSubmit}>

    <TextInput
      type="text"
      onChange={handleUserNameChange}
      placeholder="username"
      backgroundColor="red"
      color="black"
    />

    <TextInput
      type="password"
      onChange={handlePasswordChange}
      placeholder="password"
      backgroundColor="red"
      color="black"
    />

    <Submit type="submit" value={route} backgroundColor="red" />
    {displayWarning && <Warn>Please enter a valid username or password</Warn>}
    {signupWarning && <Warn>Username already exists</Warn>}
  </LoginForm>
);

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Warn = styled.div`
  color: red;
`;

export default AuthForm;
