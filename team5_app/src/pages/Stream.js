import React, { useState, useEffect, useRef } from 'react'
import UsernamePopup from '../components/UsernamePopup'
import LoginPopup from '../components/LoginPopup'
import Data from '../json/Videos.json';
import Button from 'react-bootstrap/Button'

function Stream( props ) {
    const [messages, setMessages] = useState([])
	const [chatText, setChatText] = useState('')
	const [usernameFlag, setUsernameFlag] = useState(false)
	const [loginFlag, setLoginFlag] = useState(false)
    const [room, setRoom] = useState('Standard')
	const [display, setDisplay] = useState('none')
    const bottomRef = useRef(null)

    function launchModal() {
	    if (!props.email) {
	        setLoginFlag(true)
	    }
	    if (props.email && !props.username) {
	        setUsernameFlag(true)
	    }
	}

	function changeRoom() {
        setRoom(oldRoom => (oldRoom == 'Standard') ? 'Premium' : 'Standard')
        setMessages([])
        setChatText('')
	}

    const postChat = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value.length === 0) {
                return
            }
            props.socket.emit('message', {message: event.target.value, username: props.username, room: room})
			setChatText('')
        }
    }


	const handleChange = (e) => {
		setChatText(e.target.value)
	}



	useEffect(() => {

	    const gotMessage = (message) => {
            setMessages( m => [...m, message])
            bottomRef.current.scrollIntoView({behavior: "smooth"})
        }
        props.socket.emit('join', { 'room': room, 'username' : props.username});
		props.socket.on('message', gotMessage)
        return (() => {
			props.socket.removeListener('message', gotMessage)
	        props.socket.emit('leave', { 'room': room, 'username' : props.username});
		})
	},[props.socket, room, props.username]);

    if (props.status === 'Premium' && display === 'none') {
        setDisplay('inline')
    }

    return (
    <div className='stream-page'>
      <LoginPopup email = { props.email } loginFlag = { loginFlag } />
      <UsernamePopup username = { props.username } usernameFlag = { usernameFlag } setUsernameFlag = { setUsernameFlag } setUsername = { props.setUsername } />
      <h1> { `Live Video Stream ${props.match.params.id}` }
        <div style = {{ display: display}}>
            <span> You are currently viewing the {room} chat </span>
            <Button variant="info" onClick = {changeRoom}>Switch Chat</Button>
        </div>
      </h1>
      <div className='video-page-wrapper stream-page-wrapper'>
        <div className='video-page-background video-page-hover'>
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
            <span key={messages.length} ref={bottomRef} float="left" clear="both" />
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
