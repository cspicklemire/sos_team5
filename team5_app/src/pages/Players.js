import React from 'react';
import Player from '../components/Player.js';
import Data from '../json/Players.json';
import '../css/Player.css';

function Players() {
  return (
    <div className='player-page'>
      {Data.map( (player, index) => {
        return <Player data={player} key={index} />
      })}
    </div>
  );
}

export default Players;
