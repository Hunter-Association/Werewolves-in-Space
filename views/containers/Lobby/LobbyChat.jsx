import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import Styled from 'styled-components';
import { GlobalContext } from '../../store';
import { Row } from '../../library';
import socket from '../../util/socket.config';

const LobbyChat = ({ height, width }) => {
  const msgRef = useRef();
  const { player, setPlayer, gameID } = useContext(GlobalContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat-message', (sender, msg) => {
      setMessages((prev) => [...prev, { sender, msg }]);
    });
    socket.on('murdered', (victim) => {
      if (victim.username === player.username) {
        setPlayer((prev) => ({ ...prev, isDead: true }));
        socket.on('dead-chat-message', (sender, msg) => {
          setMessages((prev) => [...prev, { sender, msg, socket }]);
        });
      }
    });

    // return () => socket.disconnect();
  }, []);

  const clickHandler = () => {
    socket.emit('chat-message', gameID, player, msgRef.current.value);
    msgRef.current.value = '';
  };
  const kill = () => {
    socket.emit('murdered', gameID, player, player);
  };

  const keyHandler = (e) => {
    if (e.code === 'Enter') {
      clickHandler();
    }
  }
  return (
    <ChatContainer height={height} width={width}>
      <ChatConversation>
        {
          messages.map((msg) => (
            msg.sender.isDead
              ? (
                <DeadText>
                  {msg.sender.username}
                  :
                  {' '}
                  {msg.msg}
                  {' '}
                </DeadText>
              )
              : (
                <Text>
                  {msg.sender.username}
                  :
                  {' '}
                  {msg.msg}
                  {' '}
                </Text>
              )
          ))
        }
      </ChatConversation>
      <Row>
        <ChatInput ref={msgRef} type="text" onKeyPress={keyHandler} placeholder="write your message" />
        <ChatButton onClick={clickHandler}>SEND</ChatButton>
      </Row>
      {/* <ChatButton onClick={kill}>Click2Die</ChatButton> */}
    </ChatContainer>
  );
};

export default LobbyChat;

const ChatContainer = Styled.div`
  height: 95%;
  width: 60%;
  overflow: hidden;
`;

const ChatConversation = Styled.article`
  height: 95%;
  background-color: black;
  color: red;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}
`;
const ChatInput = Styled.input`
  font-family: arial;
  font-size: 2em;
  width: 80%;
  min-height: 30px;
  color: red;
  background-color: black;
  border-style: none;
  &:focus{
    outline: none;
  }
`;
const ChatButton = Styled.button`
  font-family: arial;
  font-size: 2em;
  font-weight: bold;
  min-height: 30px;
  width: 20%;
  color: red;
  background-color: black;
  border-style: none;
`;
const Text = Styled.p`
  font-family: arial;
  font-size: 20px;
  margin: 3px;
`;
const DeadText = Styled.p`
  font-family: arial;
  margin: 3px;
  color: grey;
`;
