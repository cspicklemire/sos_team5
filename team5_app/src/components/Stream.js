import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Data from '../json/Videos.json';

function Stream( props ) {
  const [img, setImg] = useState(`/videos/${Data[props.id].path}.jpg`);

  function toGIF() {
    setImg(`/videos/${Data[props.id].path}.gif` );
  }

  function toJPG() {
    setImg(`/videos/${Data[props.id].path}.jpg`)
  }

  return (
    <div className='stream'>
      <div className='video'>
        <div className='video-page-wrapper stream-wrapper'>
          <div className='video-page-background stream-page-background'>
            <div className='video-page-background-2'>
              <div className='video-page-background-3'>
                <NavLink to={`/streams/${props.id}`}>
                  <div className='video-component stream-component'>
                    <img src={ img }
                      onMouseOver={ toGIF }
                      onMouseOut={ toJPG }
                      className="video-thumbnail" alt="thumbnail" />
                    <h1 className='stream-live-text'> LIVE </h1>
                    <div className='stream-gradient'></div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className='video-description'>

        </div>
      </div>
    </div>
  );
}

/*
<div className='video stream'>
  <div className='video-widget'>
    <NavLink to={`/streams/${props.id}`}> <div className='video-component stream-component'></div> </NavLink>
  </div>
  <div className='video-description'>

  </div>
</div>
*/

export default Stream;
