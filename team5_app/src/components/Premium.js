import LoginPopup from './LoginPopup'
import React, { useState } from 'react'



function Premium(props) {


    const [loginFlag, setLoginFlag] = useState(false)
    
    function button_pressed(e) {
        if (!props.email) {
	        setLoginFlag(true)
	    }
        e.preventDefault();
        updateStatus( props.data.package )
    }
  
    async function updateStatus( status ) {
        let result
        try{
            const response = await fetch('/api/updatestatus', 
                                    { method: 'POST', 
                                      headers: {'Content-Type': 'application/json'},  
                                      body: JSON.stringify({ status: status }),
                                    })
            result = await response.json()
            props.setStatus(result.status)
        }
        catch(e){
            result = {error:e}
        }
        return result
    }

    return (
    <div className='premium-comp'>
      <div className='premium-background'>
        <LoginPopup email = { props.email } loginFlag = { loginFlag } />
        <h1 className='premium-title'> {props.data.package} </h1>
        <ul className='premium-details'>
          <li className='premium-price'> { `${props.data.price} / ${props.data.length}` } </li>
          {props.data.benefits.map( (benefits, index) => {
            return <li> {benefits} </li>
          })}
        </ul>
        <button className='premium-button' onClick={button_pressed}> Subscribe </button>
      </div>
    </div>
  );
}

export default Premium;
