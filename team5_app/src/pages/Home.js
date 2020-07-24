import React from 'react';
import Twitter from '../components/TwitterFeed';
import Video from '../components/Video.js';
import Stream from '../components/Stream.js';
import Countdown from '../components/Countdown.js';

function Home() {
  return (
    <div className='home-page'>
      <div className='home-page-stream'>
        <Stream id='5' />
      </div>
      <div className='home-flex'>
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
              <a href="/#/sponsors">
      			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src={ `/img/sponsors/salesforce.jpg` } width = '250' height = '250' alt="SalesForce" />
      		  </a>
            </div>
          </div>
        </div>

        <div className='home-flex-container'>
          <div className='home-flex-relative'>
            <div className='home-flex-content'>
              <a href="/#/sponsors">
      			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src={ `/img/sponsors/nike.jpg` } width = '250' height = '250' alt="Nike" />
      		  </a>
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
              <Video id='1' />
            </div>
          </div>
        </div>
        
        <div className='home-flex-container'>
          <div className='home-flex-relative'>
            <div className='home-flex-content'>
			  <a href="/#/sponsors">
      			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img src={ `/img/sponsors/atnt.jpg` } width = '250' height = '250' alt="At&t" />
      		  </a>         
      		 </div>   
          </div>
        </div>

      </div>
      
      <Twitter />
    </div>
  );
}


/*
<Countdown />
<div className='home-page-video'>
  <div className='home-page-stream'>
    <Stream id='4' />
  </div>
  <Video id='0' />
  <Video id='1' />
</div>
<Twitter />
*/

export default Home;
