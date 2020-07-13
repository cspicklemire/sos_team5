import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function UsernamePopup(props) {

    
    const [name, setName] = useState("");

    function handleChange(e) {
    	setName(e.target.value);
    }
    
    const [show, setShow] = useState(false);

    function handleChange(e) {
        setName(e.target.value);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    if (props.modalFlag && (!show)) {
    	setShow(true)
    }
    
    console.log("ModalFlag show" + props.modalFlag + show)
    

    return (
    <>
      <Modal show={ show } onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<p> Please enter your username </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Username
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default UsernamePopup