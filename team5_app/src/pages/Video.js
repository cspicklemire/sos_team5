import React from 'react';
import Data from '../json/Videos.json';

function Video( {match} ) {
  return (
    <div>
      <h1> { `Video ${match.params.id}` } </h1>
      <div className='video-page-wrapper'>
        <div className='video-page-background video-page-hover'>
          <div className='video-page-background-2'>
            <div className='video-page-background-3'>
              <video className='video-page-mp4' controls>
                <source src={ `/videos/${Data[match.params.id].path}.mp4` } className='video-page-mp4' type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
