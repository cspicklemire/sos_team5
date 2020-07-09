import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import '../css/News-Feed.css';

function Slider() {
  return (
    <div className='news-feed'>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="IndianaFever"
        options={{width: 700}}
      />
    </div>
  );
}

export default Slider;
