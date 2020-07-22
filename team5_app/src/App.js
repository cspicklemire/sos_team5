import React, { useState, useEffect } from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Pages.css';
import './css/Components.css';

import TopBar from './components/TopBar';
import Nav from './components/Nav';
import Home from './pages/Home';
import Premium from './pages/Premium';
import Sponsors from './pages/Sponsors';
import Players from './pages/Players';
import Timeline from './pages/Timeline';
import Stream from './pages/Stream';
import Upload from './pages/Upload'
import Video from './pages/Video';
import config from './config'
import * as io from 'socket.io-client'


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
    const [status, setStatus] = useState('')

    useEffect( () => {
    	async function updateEmail() {
			try {
				const data = await getUserInfo()
                setEmail(data.email)
                setUsername(data.username)
                setStatus(data.status)
			}
			catch(error) {
				console.log("Error: " + JSON.stringify(error))
			}
    	}

    	updateEmail()
    },[])

    let socket = io(config.socket_io_server)

    return (
    <Router>
      <div className="App">
        <Nav status = { status } email = { email }/>
        <div className="page-margin">
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/premium' exact component={ () => <Premium email = {email} setStatus = { setStatus } />} />
            <Route path='/sponsors' exact component={Sponsors} />
            <Route path='/players' exact component={Players} />
            <Route path='/timeline' exact component={Timeline} />
            <Route path='/timeline/:id' exact component={Video} />
            <Route path='/upload/' exact component={Upload} />
            <Route path='/streams/:id' exact render={ ({match}) => <Stream setUsername = { setUsername } match = {match} status = { status } username = { username } email = { email } socket = { socket } />} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
