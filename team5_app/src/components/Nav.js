import React from 'react';
import {NavLink} from 'react-router-dom';
import GoogleLogin from './GoogleLogin';

function Nav(props){
  return (
    <nav className="nav-root">
      <div className="nav-layer-2">
        <div className="nav-right">
          <ul className="nav-links">
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/' exact> <li> Home </li> </NavLink>
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/streams/4' exact> <li> Stream </li> </NavLink>
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/timeline' exact> <li> Timeline </li> </NavLink>
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/players' exact> <li> Players </li> </NavLink>
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/premium' exact> <li> Premium </li> </NavLink>
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/sponsors' exact> <li> Sponsors </li> </NavLink>
            <NavLink className='nav-links-option' activeClassName='nav-links-active' to='/upload' exact> <li> Upload </li> </NavLink>
          </ul>
        </div>
        <div className='nav-left'>
          <h1> Team Name </h1>
        </div>
      </div>
    </nav>
  );
}

/*<GoogleLogin status = { props.status } email = { props.email } />*/

export default Nav;
