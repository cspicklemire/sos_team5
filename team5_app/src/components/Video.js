import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Data from '../json/Videos.json';

function Video( props ) {
  const [img, setImg] = useState(`/videos/${Data[props.id].path}.jpg`);

  function toGIF() {
    setImg(`/videos/${Data[props.id].path}.gif` );
  }

  function toJPG() {
    setImg(`/videos/${Data[props.id].path}.jpg`)
  }

  return (
    <div className='video'>
      <div className='video-page-wrapper'>
        <div className='video-page-background'>
          <div className='video-page-background-2'>
            <div className='video-page-background-3'>
              <NavLink to={`/timeline/${props.id}`}>
                <img src={ img }
                  onMouseOver={ toGIF }
                  onMouseOut={ toJPG }
                  className="video-thumbnail" alt="thumbnail" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className='video-description'>

      </div>
    </div>
  );
}

/*<div className='video'>
  <div className='video-widget'>
    <NavLink to={`/timeline/${props.id}`}> <div className='video-component'></div> </NavLink>
  </div>
  <div className='video-description'>
  </div>
</div>*/

export default Video;
