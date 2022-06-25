import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../store';

const Login = () => {
  const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);

  return (
    <Link to="/home">
      <div>Home</div>
      <p>{isDarkMode}</p>
    </Link>
  );
};

export default Login;
