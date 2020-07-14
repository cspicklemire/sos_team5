import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UsernamePopup(props) {
    
    const [name, setName] = useState("")
    const [show, setShow] = useState(false)
    
    async function updateUsername( username ) {
        let result
        try{
            const response = await fetch('/api/updateusername', 
                                    { method: 'POST', 
                                      headers: {'Content-Type': 'application/json'},  
                                      body: JSON.stringify({ username: username }),
                                    })
            result = await response.json()
            props.setUsername(result.username)
        }
        catch(e){
            result = {error:e}
        }
        return result
    }
    
    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value)
    }
    
    function handleSave() {
        console.log("in save")
        updateUsername ( name )
        setShow(false)
        props.usernameFlag = false     
        setName('')
    }
    function handleClose() {
        console.log("in close")
        setShow(false)
        props.usernameFlag = false  
        setName('')   
    }

    const handleShow = () => setShow(true)
    
    
    if (props.usernameFlag && !show && !props.username) {
        console.log("showing")
    	handleShow()
    }
    
    
    

    return (
    <>
      <Modal show={ show } onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Looks like you haven't set a username!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        	<p> Please enter your username </p>
        	<input value = { name } onChange = { handleChange } /> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save Username
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default UsernamePopup