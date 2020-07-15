import React, { useState, useEffect } from 'react'
import UsernamePopup from '../components/UsernamePopup'
import LoginPopup from '../components/LoginPopup'
import Button from 'react-bootstrap/Button'


function Stream( props ) {
    const [messages, setMessages] = useState([])
	const [chatText, setChatText] = useState('')
	const [usernameFlag, setUsernameFlag] = useState(false)
	const [loginFlag, setLoginFlag] = useState(false)
	const [room, setRoom] = useState('Standard')
	const [display, setDisplay] = useState('none')
	
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
      <UsernamePopup username = { props.username } usernameFlag = { usernameFlag } setUsername = { props.setUsername } />
      <h1> { `Live Video Stream ${props.match.params.id}` } 
        <div style = {{ display: display}}>
            <span> You are currently viewing the {room} chat </span>
            <Button variant="info" onClick = {changeRoom}>Switch Chat</Button>
        </div>
      </h1>
      <div className='video-page-wrapper stream-page-wrapper'>
        <div className='video-page-background'>
          <div className='video-page-background-2'>
            <div className='video-page-background-3'>

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
