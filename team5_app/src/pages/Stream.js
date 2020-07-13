import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



function Stream( props ) {
    const [messages, setMessages] = useState([])
	const [chatText, setChatText] = useState('')

    const gotMessage = (message) => {
        console.log("Message:" + JSON.stringify(message))
        setMessages([...messages, message])
    }

    const postChat = (event) => {
        if (event.key === 'Enter') {
            props.socket.emit('message', {message: event.target.value, username: props.email})
			setChatText('')
        }
    }

	const handleChange = (e) => {
		setChatText(e.target.value)
	}

	useEffect(() => {
		props.socket.on('message', gotMessage)
		return (() => {
			props.socket.removeListener('message', gotMessage)
		})
	},[props.socket, gotMessage])



    return (
    <div className='stream-page'>
      <h1> { `Live Video Stream ${props.match.params.id}` } </h1>
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
                 <input name="chatText" value = {chatText}
           	      placeholder = "chat here"
                  className= 'live-stream-chat-input'
           	      onChange = {handleChange}
                  onKeyDown = {(event) => postChat(event)}
                 />
        </div>
      </div>
    </div>
  );
}

export default Stream;
