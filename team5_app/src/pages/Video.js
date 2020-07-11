import React from 'react';

function Video( {match} ) {
  return (
    <div>
      <h1> { `Video ${match.params.id}` } </h1>
      <div className='live-stream-video'>

      </div>
    </div>
  );
}

export default Video;
