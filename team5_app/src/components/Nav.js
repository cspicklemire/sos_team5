import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../fever.png';
import './App.css';

function Nav(){
  const navStyle = {
    textDecoration: 'none',
    fontSize: '25px',
    marginTop: '20px'
  };

  return (
    <nav className="nav-root">
      <div className="nav-trim">
        <ul className="nav-links">
          <NavLink to='/' exact> <img src={logo} className="nav-logo" alt="logo" /> </NavLink>
          <NavLink style={navStyle} activeClassName='nav-links-active' to='/' exact> <li> Home </li> </NavLink>
          <NavLink style={navStyle} activeClassName='nav-links-active' to='/about' exact> <li> About </li> </NavLink>
          <NavLink style={navStyle} activeClassName='nav-links-active' to='/contactus' exact> <li> ContactUs </li> </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
