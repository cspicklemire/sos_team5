import React from 'react';

async function updateStatus() {
    let result
      try{
        const response = await fetch('/api/updatestatus', 
                                    { method: 'POST', 
          headers: {'Content-Type': 'application/json'},  
          body: "",
        })
          result = await response.json()
      }
      catch(e){
          result = {error:e}
      }
      return result
  }