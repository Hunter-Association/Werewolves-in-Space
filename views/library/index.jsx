import Styled from 'styled-components';

export const Row = Styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

export const Column = Styled.div`
  display: flex;
  font-family: anotherDanger;
  flex-direction: column;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
`;

export const Button = Styled.button`
border-radius: 10px;
width: 417px;
height: 54px;
background-color: ${(props) => props.backgroundColor || '#3e7DA0'};
color:  ${(props) => props.color || '#E0E0E0'};
font-size: 24px;
border: none;
box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
margin-top: 13px;
&:active {
  outline: none;
  box-shadow: none;
}
`;
export const Submit = Styled.input`
border-radius: 10px;
width: 417px;
height: 54px;
background-color: ${(props) => props.backgroundColor || '#d20000'};
color:  ${(props) => props.color || 'white'};
font-size: 24px;
border: none;
box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
margin-top: 13px;
text-shadow: 2px 2px #00000051;
&:active {
  outline: none;
  box-shadow: none;
}
`;
export const TextInput = Styled.input`
  border-radius: 10px;
  width: 417px;
  height: 54px;
  text-align: center;
  letter-spacing: 4px;
  background-color: ${(props) => props.backgroundColor || '#D20000'};
  color:  ${(props) => props.color || 'white'};
  font-size: 24px;
  border: none;
  box-shadow: 4px 4px 4px 1px rgba(0,0,0,0.4);
  margin-top: 13px;
  text-shadow: 3px 3px #00000051;
  &:active {
    outline: none;
    box-shadow: none;
  }
  &::placeholder {
    color: #c2c2c2;
  }
  &:focus::placeholder {
    color: transparent;
    text-shadow: none;
  }
  &:focus {
    outline: none;
  }
`;

export const Center = Styled.div`
display: flex;
flex-direction: ${(props) => props.direction || 'column'};
align-items: center;
justify-content: center;
height: 100vh;
width: 100%;
background-color: ${(props) => props.backgroundColor || '#000000'};
`;

export const Scroll = Styled(Column)`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  overflow: scroll;
`;
