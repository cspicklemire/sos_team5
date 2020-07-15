import React from 'react';
import {NavLink} from 'react-router-dom';
import GoogleLogin from './GoogleLogin';

function Nav(props){
  return (
    <nav className="nav-root">
      <div className="nav-trim">
        <ul className="nav-links">
          <NavLink to='/' exact> <img src={'/img/placeholder.png'} className="nav-logo" alt="logo" /> </NavLink>
          <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/' exact> <li> Home </li> </NavLink>
          <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/streams/4' exact> <li> Stream </li> </NavLink>
          <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/timeline' exact> <li> Timeline </li> </NavLink>
          <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/players' exact> <li> Players </li> </NavLink>
          <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/premium' exact> <li> Premium </li> </NavLink>
          <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/sponsors' exact> <li> Sponsors </li> </NavLink>
        </ul>
        <br />
        <br />
        <br />
        <br />
        <GoogleLogin status = { props.status } email = { props.email } />
      </div>
    </nav>
  );
}

export default Nav;
