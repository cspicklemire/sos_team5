import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Nav from './Nav';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';



async function getUserInfo() {
    let result
    try{
        const response = await fetch('/api/getuserinfo')
        result = await response.json()
    }
    catch(e){
        result = {error:e}
    }
    return result
}





function App() {
    const [email, setEmail] = useState('')
    
    async function updateEmail() {
        const data = await getUserInfo()
        setEmail(data.email)
    }

    useEffect(() => {
        try {
            updateEmail()
        }
        catch(error) {
            console.log("Yikes!" + JSON.stringify(error))
        }
    },[])

    
    return (
    <Router>
      <div className="App">
        <Nav email = { email }/>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' exact component={About} />
          <Route path='/contactus' exact component={ContactUs} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
