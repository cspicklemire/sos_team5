import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as io from 'socket.io-client'

async function getData() {
    /*
    ** This is a pretty general pattern for calling fetch.
    */
    
    let result
    try{
        const response = await fetch('/api/listusers')
        result = await response.json()
    }
    catch(e){
        result = {error:e}
    }
    return result
}

async function postData( data ) {
    let result
    try {
        const response = await fetch('/api/createuser', 
                                { method: 'POST', 
                                  headers: {'Content-Type': 'application/json'},  
                                  body: JSON.stringify(data),
                                })
        result = await response.json()
    }
    catch(e) {
        result = {error: e}
    }
    return result
}






