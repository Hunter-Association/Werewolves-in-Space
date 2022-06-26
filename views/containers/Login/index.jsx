import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { GlobalContext } from '../../store';
import { Row, Button } from '../../library';

const Login = () => (
  <Row>
    <Link to="/home">
      <div>this blows</div>
    </Link>
    <Button>Click me to vote</Button>
    <Button>Click me to connect</Button>
  </Row>
);

export default Login;
