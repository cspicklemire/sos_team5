import React, { useState, useEffect, useRef } from 'react'
import UsernamePopup from '../components/UsernamePopup'
import LoginPopup from '../components/LoginPopup'
import Data from '../json/Videos.json';
import Button from 'react-bootstrap/Button'
import DecibelMeter from '../components/DecibelMeter'
import CountDown from '../components/Countdown';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Stream( props ) {
    const [messages, setMessages] = useState([])
	const [chatText, setChatText] = useState('')
	const [usernameFlag, setUsernameFlag] = useState(false)
	const [loginFlag, setLoginFlag] = useState(false)
    const [room, setRoom] = useState('Standard')
	const [display, setDisplay] = useState('none')
    const [angle, setAngle] = useState(0)
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

        setRoom(oldRoom => (oldRoom === 'Standard') ? 'Premium' : 'Standard')
        setMessages([])
        setChatText('')
        if (room === 'Standard') {
            let message = { message: 'You have entered the Premium room', username: ' '}
            setMessages([message])
        }
    }

    const postChat = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value.length === 0) {
                return
            }
            props.socket.emit('message', {message: event.target.value, username: props.username, room: room, time: Date.now()})
			setChatText('')
        }
    }


	const handleChange = (e) => {
		setChatText(e.target.value)
	}

    function findAngle (messages) {
        let time = Date.now()
        let count = 0;
        let message
        for (message of messages) {
            if ((message.time + 15000) > time) {
                count++
            }
            if ((message.time + 10000) > time) {
                count++
            }
            if ((message.time + 5000) > time) {
                count++
            }
            if ((message.time + 2500) > time) {
                count++
            }
        }
        return count

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

    useEffect(() => {

        function foo() {
            let toSet = findAngle(messages)
            setAngle(toSet)
        }

        let theInterval = setInterval(foo, 1000/10)
        return (()=> clearInterval(theInterval))
    },[messages])

    return (
    <div className='stream-page'>
      <LoginPopup email = { props.email } loginFlag = { loginFlag } setLoginFlag = { setLoginFlag }/>
      <UsernamePopup username = { props.username } usernameFlag = { usernameFlag } setUsernameFlag = { setUsernameFlag } setUsername = { props.setUsername } />
      
      <Container>
         <Row>
            <Col>
                <CountDown />
            </Col>
            <Col sm = {7} >
                <DecibelMeter angle = { angle }/>
            </Col>
            <Col style = {{display : display}}>
                <br />
                <br />
                <br/>
                <p> You are currently viewing the {room} chat </p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="info" onClick = {changeRoom}>Switch Chat</Button>
            </Col>
          </Row>
        </Container>

      <div className='video-page-wrapper stream-page-wrapper'>
        <div className='video-page-background video-page-hover'>
          <div className='video-page-background-2'>
            <div className='video-page-background-3'>
              <video className='video-page-mp4' controls autoPlay>
                <source src={ `/videos/${Data[4].path}.mp4` } className='video-page-mp4' type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>


      <div className='live-stream-chat'>
        <div className='live-stream-chat-log'>
            { messages.map((m,i) => (<span key={i}>{m.username + ' : ' + m.message}<br/></span>))}
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