import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Nav from './Nav';
import Home from './Home';
import About from './About';
import ContactUs from './ContactUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
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
