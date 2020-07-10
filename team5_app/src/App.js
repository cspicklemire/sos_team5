import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import SponsorsBar from './components/Sponsors-Bar';
import Nav from './components/Nav';
import Home from './pages/Home';
import Premium from './pages/Premium';
import Schedule from './pages/Schedule';
import Sponsors from './pages/Sponsors';
import Players from './pages/Players';
import Streams from './pages/Streams';
import LiveStream from './pages/Stream_Live';


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
    const [username, setUsername] = useState('')

    useEffect( () => {
    	async function updateEmail() {
			try {
				const data = await getUserInfo()
				setEmail(data.email)
				console.log("username is " + data.username)
			}
			catch(error) {
				console.log("Error: " + JSON.stringify(error))
			}
    	}

    	updateEmail()
    },[])


    return (
    <Router>
      <div className="App">
        <Nav email = { email }/>
        <SponsorsBar />
        <div className="page-margin">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/schedule' exact component={Schedule} />
            <Route path='/premium' exact component={Premium} />
            <Route path='/sponsors' exact component={Sponsors} />
            <Route path='/players' exact component={Players} />
            <Route path='/streams' exact component={Streams} />
            <Route path='/streams/:id' exact component={LiveStream} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
