import React from 'react';

const Player = ({ player, color, status }) => (
  (
    <>
      <li>{player}</li>
      <div>{color}</div>
      <div>{status}</div>
    </>
  )
);

export default Player;
