import React from 'react';
import Twitter from '../components/TwitterFeed';
import Video from '../components/Video.js';
import Stream from '../components/Stream.js';

function Home() {
  return (
    <div className='home-page'>
      <div className='home-page-video'>
        <div className='home-page-stream'>
          <Stream id='4' />
        </div>
        <Video id='0' />
        <Video id='1' />
      </div>
      <Twitter />
    </div>
  );
}

export default Home;
