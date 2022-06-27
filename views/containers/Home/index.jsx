import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <Link to="/">
      <div>Login</div>
    </Link>
    <Link to="/lobby">
      <div>Lobby</div>
    </Link>
  </>
);

export default Home;
