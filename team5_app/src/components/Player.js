import React, {useState, useEffect} from 'react';

function Player(props) {
  const [player, setPlayer] = useState('')

  console.log( process.env.PUBLIC_URL+'/'+player.image );

  useEffect( () => {
    setPlayer( props.data );
  }, [])

  return (
    <div className='player-comp'>
      <h1> { `../img/players/${player.image}` } </h1>
      <img source={ `../img/players/${player.image}` } className="player-logo" alt="player" />
    </div>
  );
}

export default Player;
