import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../store';

const Login = () => {
  const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);

  return (
    <div>
      <Link to="/home">
        <div>Home</div>
        <p>{isDarkMode}</p>
      </Link >
      <Link to="/board">
        <div>Board</div>
      </Link>
    </div>
  );
};

export default Login;
