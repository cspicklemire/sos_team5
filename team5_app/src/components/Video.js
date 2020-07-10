import React from 'react';
import {NavLink} from 'react-router-dom';

function Video( props ) {
  return (
    <div className='video-widget'>
        <NavLink to={`/streams/${props.id}`}> <div></div> </NavLink>
    </div>
  );
}

export default Video;