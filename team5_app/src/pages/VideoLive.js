import React from 'react';

function VideoLive( {match} ) {
  function handleSubmit(e) {
    e.preventDefault()
    console.log('submit');
  }

  function text_changed(e) {
    console.log( e.target.value );
  }

  return (
    <div>
      <h1> { `Live Video Stream ${match.params.id}` } </h1>
      <div className='live-stream-video'>

      </div>
      <div className='live-stream-chat'>
        <div className='live-stream-chat-log'>
          <div>
            <div className='live-stream-chat-text'> Indiana </div>
            <div className='live-stream-chat-text'> Fever </div>
            <div className='live-stream-chat-text'> is </div>
            <div className='live-stream-chat-text'> Amazing </div>
          </div>
        </div>
        <div className='live-stream-chat-input'>
        <form onSubmit={handleSubmit} className='Search-Form'>
          <input type='text' name='text' onChange={text_changed} className='live-stream-chat-text-field' />
          <button type="submit" className='live-stream-chat-text-submit'> Submit </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default VideoLive;
