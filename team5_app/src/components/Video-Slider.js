import React from 'react';
import '../css/Video-Slider.css';
import Video from './Video';

function Slider() {
  return (
    <div className='video-slider'>
      <div className='video-slider-2'>
        <Video id='1' />
        <Video id='2' />
        <Video id='3' />
        <Video id='4' />
        <Video id='5' />
        <Video id='6' />
        <Video id='7' />
        <Video id='8' />
        <Video id='9' />
        <Video id='10' />
        <Video id='11' />
        <Video id='12' />
        <Video id='13' />
      </div>
    </div>
  );
}

export default Slider;
