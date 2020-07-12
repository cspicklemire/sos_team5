import React from 'react';

function Player(props) {
  function button_pressed(e) {
    e.preventDefault();
    console.log( `${props.data.package} package button has been pressed` );
  }

  return (
    <div className='premium-comp'>
      <div className='premium-background'>
        <h1 className='premium-title'> {props.data.package} </h1>
        <ul className='premium-details'>
          <li className='premium-price'> { `${props.data.price} / ${props.data.length}` } </li>
          {props.data.benefits.map( (benefits, index) => {
            return <li> {benefits} </li>
          })}
        </ul>
        <button className='premium-button' onClick={button_pressed}> Subscribe </button>
      </div>
    </div>
  );
}

export default Player;
