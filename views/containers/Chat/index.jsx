import React, {
  useContext, useRef, useEffect, useState,
} from 'react';
import Styled from 'styled-components';
import { GlobalContext } from '../../store';
import { Row } from '../../library';
import socket from '../../util/socket.config';

const Chat = ({ height, width }) => {
  const msgRef = useRef();
  const { player, setPlayer, gameID } = useContext(GlobalContext);
  const [messages, setMessages] = useState([]);
  const hasRan = useRef(false);
  useEffect(() => {
    socket.on('chat-message', (sender, msg) => {
      setMessages((prev) => [...prev, { sender, msg }]);
    });
    socket.on('murdered', (victim) => {
      if (victim.username === player.username && !hasRan.current) {
        hasRan.current = true;
        console.log(hasRan);
        setPlayer((prev) => ({ ...prev, isDead: true }));
        socket.on('dead-chat-message', (sender, msg) => {
          setMessages((prev) => [...prev, { sender, msg, socket }]);
        });
      }
    });

    return () => socket.disconnect();
  }, []);

  const clickHandler = () => {
    socket.emit('chat-message', gameID, player, msgRef.current.value);
    msgRef.current.value = '';
  };
  const kill = () => {
    socket.emit('murdered', gameID, player, player);
  };

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
        <ChatInput ref={msgRef} type="text" placeholder="write your message" />
        <ChatButton onClick={clickHandler}>Send</ChatButton>
      </Row>
      <ChatButton onClick={kill}>Click2Die</ChatButton>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = Styled.div`
  height: fit-content;
  width: 350px;
  overflow: hidden;
`;

const ChatConversation = Styled.article`
  height: 300px;
  background-color: black;
  color: red;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}
`;
const ChatInput = Styled.input`
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
  min-height: 30px;
  width: 20%;
  color: red;
  background-color: black;
  border-style: none;
`;
const Text = Styled.p`
  margin: 3px;
`;
const DeadText = Styled.p`
  margin: 3px;
  color: grey;
`;
