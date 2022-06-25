import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <Link to="/">
      <div>Login</div>
    </Link>

    <a href="/home">
      <div>Login</div>
    </a>
  </>
);

export default Home;
