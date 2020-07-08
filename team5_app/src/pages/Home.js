import React from 'react';
import VideoSlider from '../components/Video-Slider';
import Schedule from '../components/Schedule-Feed';
import News from '../components/News-Feed';

function Home() {
  return (
    <div>
      <VideoSlider />
      <News />
      <Schedule />
    </div>
  );
}

export default Home;
