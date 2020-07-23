import React from 'react';
import Video from '../components/Video.js';

function Timeline() {
  return (
    <div className='basic-page'>
    <div className='home-flex page-flex'>
      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='1' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='2' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='3' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='0' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='1' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='3' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='2' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='0' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='2' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='1' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='3' />
          </div>
        </div>
      </div>

      <div className='home-flex-container'>
        <div className='home-flex-relative'>
          <div className='home-flex-content'>
            <Video id='0' />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
/*
<Video id='0' />
<Video id='1' />
<Video id='2' />
<Video id='3' />
<Video id='2' />
<Video id='4' />
<Video id='1' />
<Video id='1' />
<Video id='0' />
<Video id='3' />
<Video id='0' />
<Video id='4' />
*/
export default Timeline;
