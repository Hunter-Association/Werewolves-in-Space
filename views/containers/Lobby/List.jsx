import React from 'react';

const List = (props) => (
  const playerList = props.players.map((player) =>
   <Player name={props.name} color={props.color} status={props.status}/>
  )

  return (
    <li><Player /></li>
  )
);

export default List;
