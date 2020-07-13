import React from 'react';

function Video( {match} ) {
  return (
    <div>
      <h1> { `Video ${match.params.id}` } </h1>
      <div className='video-page-wrapper'>
        <div className='video-page-background'>
          <div className='video-page-background-2'>
            <div className='video-page-background-3'>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
