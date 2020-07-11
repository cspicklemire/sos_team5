import React from 'react';
import {NavLink} from 'react-router-dom';

function Video( props ) {
  return (
    <div className='video'>
      <div className='video-widget'>
        <NavLink to={`/timeline/${props.id}`}> <div className='video-component'></div> </NavLink>
      </div>
      <div className='video-description'>
      </div>
    </div>
  );
}

export default Video;
