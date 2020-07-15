import React from 'react';

function Player(props) {
  return (
    <div className='player-comp'>
      <img src={ `/img/players/${props.data.image}` } className="player-logo" alt="player" />
      <div className='player-bottom'>
        <div className='player-bottom-background'>
          <h1 className='video-title'> { `${props.data.name}` } </h1>
          <h2 className='video-description'> { `#${props.data.number}` } </h2>
          <h2 className='video-description'> { `${props.data.position}` } </h2>
          <h2 className='video-description'> { `${props.data.height}` } </h2>
          <h2 className='video-description'> { `${props.data.weight}` } </h2>
          <h2 className='video-description'> { `${props.data.born}` } </h2>
        </div>
      </div>
    </div>
  );
}

export default Player;
