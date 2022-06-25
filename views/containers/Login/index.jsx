import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../store';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const ColoredColumn = styled(Column)`
  background-color: red;
  & div {
    color: blue
  };
`;

const Box = styled.div`
  width:${(props) => props.size === 'xl' ? 500 : 100 }px
`;

const Login = () => {
  const { isDarkMode, setIsDarkMode } = useContext(GlobalContext);

  return (
    <Link to="/Csslog">
      <Box size="500">
        <Row>
          <div>1</div>
          <div>2</div>
        </Row>
        <p>{isDarkMode}</p>
      </Box>
    </Link>
  );
};

export default Login;
