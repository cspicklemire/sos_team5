import React from 'react';
import Twitter from '../components/TwitterFeed';
import Video from '../components/Video.js';
import Stream from '../components/Stream.js';

function Home() {
  return (
    <div>
      <Twitter />
      <div className='home-page-video'>
        <Stream id='1' />
        <Video id='1' />
        <Video id='1' />
      </div>
    </div>
  );
}

export default Home;
