import React, { useState, useEffect } from 'react'
import UsernamePopup from '../components/UsernamePopup'
import LoginPopup from '../components/LoginPopup'
import Data from '../json/Videos.json';

function Stream( props ) {
    const [messages, setMessages] = useState([])
	const [chatText, setChatText] = useState('')
	const [usernameFlag, setUsernameFlag] = useState(false)
	const [loginFlag, setLoginFlag] = useState(false)




    const postChat = (event) => {
        if (event.key === 'Enter') {
            props.socket.emit('message', {message: event.target.value, username: props.username})
			setChatText('')
        }
    }

	const handleChange = (e) => {
		setChatText(e.target.value)
	}

	function launchModal() {
	    console.log("in launch")
	    if (!props.email) {
	        console.log("setting flag")
	        setLoginFlag(true)
	    }
	    if (props.email && !props.username) {
	        setUsernameFlag(true)
	    }
	}

	useEffect(() => {

	    const gotMessage = (message) => {
            console.log("Message: " + JSON.stringify(message))
            setMessages( m => [...m, message])
        }

		props.socket.on('message', gotMessage)
		return (() => {
			props.socket.removeListener('message', gotMessage)
		})
	},[props.socket]);

    return (
    <div className='stream-page'>
      <LoginPopup email = { props.email } loginFlag = { loginFlag } />
      <UsernamePopup username = { props.username } usernameFlag = { usernameFlag } setUsername = { props.setUsername } />
      <h1> { `Live Video Stream ${props.match.params.id}` } </h1>
      <div className='video-page-wrapper stream-page-wrapper'>
        <div className='video-page-background'>
          <div className='video-page-background-2'>
            <div className='video-page-background-3'>
              <video className='video-page-mp4' controls autoplay>
                <source src={ `/videos/${Data[4].path}.mp4` } className='video-page-mp4' type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>


      <div className='live-stream-chat'>
        <div className='live-stream-chat-log'>
            { messages.map((m,i) => (<span key={i}>{m.username + ':' + m.message}<br/></span>))}
        </div>
        <div className='live-stream-chat-input-div'>
                 <input name="chatText" value = { chatText }
           	      placeholder = "chat here"
                  className= 'live-stream-chat-input'
                  onClick = { launchModal }
           	      onChange = { handleChange }
                  onKeyDown = {(event) => postChat(event)}
                 />
        </div>
      </div>
    </div>
  );
}

export default Stream;
