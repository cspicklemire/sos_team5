import React from 'react';

function Player(props) {
  return (
    <div className='player-comp'>
      <img src={ `/img/players/${props.data.image}` } className="player-logo" alt="player" />
      <div className='player-bottom'>
        <h3> { `${props.data.name}` } </h3>
      </div>
    </div>
  );
}

export default Player;
