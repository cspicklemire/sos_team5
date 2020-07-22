import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function TwitterFeed() {
  return (
    <div className='news-feed-comp'>
      <div className='news-feed'>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="IndianaFever"
          theme="dark"
          options={{width: 700}}
        />
      </div>
    </div>
  );
}

export default TwitterFeed;
