import React from 'react';

function Sponsor(props) {
  return (
    <div className='player-comp sponsor-comp'>
      <img src={ `/img/sponsors/${props.data.image}` } className="player-logo" alt="player" />
    </div>
  );
}

export default Sponsor;
