import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UsernamePopup(props) {
    
    const [name, setName] = useState("")
    const [show, setShow] = useState(false)
    const [available, setAvailable] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('white')
    
    
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
    
    async function checkUsername( username ) {
        let result
        try{
            const response = await fetch('/api/checkusername', 
                                    { method: 'POST', 
                                      headers: {'Content-Type': 'application/json'},  
                                      body: JSON.stringify({ username: username }),
                                    })
            result = await response.json()
            setAvailable(result.available)
            if (result.available) {
                setColor("#67eb8c")
            }
            else {
                setColor("#eb6767")         
            }
            setMessage(result.message)
        }
        catch(e){
            result = {error:e}
        }
        return result
    }
    
    function handleChange(e) {
        e.preventDefault()
        checkUsername(e.target.value)
        setName(e.target.value)
    }
    
    function handleSave() {
        updateUsername ( name )
        props.setUsername( name )
        setShow(false)
        setName('')
        setMessage('')
    }
    function handleClose() {
        setShow(false)
        setName('') 
        props.setUsernameFlag(false)
        setMessage('')  
    }

    const handleShow = () => setShow(true)
    
    
    if (props.usernameFlag && !show && !props.username) {
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
        	<input value = { name } onChange = { handleChange } style = {{ backgroundColor: color }} /> 
        	<span> { message } </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave} disabled = {!available}>
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