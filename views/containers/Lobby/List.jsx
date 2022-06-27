import React from 'react';
import Player from './Player';

const List = ({
  players, name, color, status,
}) => {
  players.map(() => <Player name={name} color={color} status={status} />);

  return (
    <Player />
  );
};

export default List;
