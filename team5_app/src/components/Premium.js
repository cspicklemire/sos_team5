import React from 'react';

function Player(props) {
  function button_pressed(e) {
    e.preventDefault();
    console.log( `${props.data.package} package button has been pressed` );
  }

  return (
    <div className='Premium-Comp'>
      <div>
        <h1> { props.data.package } </h1>

        <ul>
          {props.data.benefits.map( (benefits, index) => {
            return <li> {benefits} </li>
          })}
        </ul>

        <h1> { props.data.price } </h1>
        <button onClick={button_pressed}> Subscribe </button>
      </div>
    </div>
  );
}

export default Player;
