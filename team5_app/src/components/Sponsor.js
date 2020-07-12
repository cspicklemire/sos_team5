import React from 'react';

function Sponsor(props) {
  return (
    <div className='player-comp'>
      <img src={ `/img/sponsors/${props.data.image}` } className="player-logo" alt="player" />
      <div className='player-bottom'>
        <h3> { `${props.data.name}` } </h3>
      </div>
    </div>
  );
}

export default Sponsor;
