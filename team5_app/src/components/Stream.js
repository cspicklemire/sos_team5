import React from 'react';
import {NavLink} from 'react-router-dom';
import Data from '../json/Videos.json';

function Stream( props ) {
  return (
    <div className='stream'>
      <div className='video'>
        <div className='video-page-wrapper stream-wrapper'>
          <div className='video-page-background'>
            <div className='video-page-background-2'>
              <div className='video-page-background-3'>
                <NavLink to={`/streams/${props.id}`}>
                  <div className='video-component stream-component'>
                    <img src={ `/videos/${Data[props.id].path}.jpg` } className="video-thumbnail" alt="thumbnail" />
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
