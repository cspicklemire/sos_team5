import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoogleLogin from './GoogleLogin'

function LoginPopup(props) {
    
    const [show, setShow] = useState(false)
    
    function handleClose() {
        setShow(false)
        props.loginFlag = false  
    }

    const handleShow = () => setShow(true)
    
    
    if (props.loginFlag && !show && !props.email) {
    	handleShow()
    }
    
    
    

    return (
    <>
      <Modal show={ show } onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>To access this feature, please log in!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <br />
            <br />
            <br />
        	<GoogleLogin />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default LoginPopup