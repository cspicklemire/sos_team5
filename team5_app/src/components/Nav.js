import React from 'react';
import {NavLink} from 'react-router-dom';
import GoogleLogin from './GoogleLogin'
import logo from '../img/placeholder.png';
import '../css/Nav.css';

function Nav(props){
  return (
    <nav className="nav-root">
      <div className="nav-trim">
        <ul className="nav-links">
          <NavLink to='/' exact> <img src={logo} className="nav-logo" alt="logo" /> </NavLink>
          <NavLink activeClassName='nav-links-active' to='/' exact> <li> Home </li> </NavLink>
          <NavLink activeClassName='nav-links-active' to='/streams' exact> <li> Streams </li> </NavLink>
          <NavLink activeClassName='nav-links-active' to='/schedule' exact> <li> Schedule </li> </NavLink>
          <NavLink activeClassName='nav-links-active' to='/players' exact> <li> Players </li> </NavLink>
          <NavLink activeClassName='nav-links-active' to='/premium' exact> <li> Premium </li> </NavLink>
          <NavLink activeClassName='nav-links-active' to='/sponsors' exact> <li> Sponsors </li> </NavLink>
        </ul>
        <GoogleLogin email = { props.email } />
      </div>
    </nav>
  );
}

export default Nav;
