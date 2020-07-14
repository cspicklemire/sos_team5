import React from 'react';



function Premium(props) {
 
    function button_pressed(e) {
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
