import React from 'react';
import Player from '../components/Player.js';
import Data from '../json/Players.json';

function Players() {
  return (
    <div className='basic-page'>
      {Data.map( (player, index) => {
        return <Player data={player} key={index} />
      })}
    </div>
  );
}

export default Players;
