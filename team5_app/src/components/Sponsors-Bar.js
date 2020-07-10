import React from 'react';
import logo from '../img/placeholder.png';

function SponsorsBar() {
  return (
    <div className='sponsor-background'>
      <div className='sponsor-background-2'>
        <img src={logo} className="sponsor-logo" alt="logo" />
        <img src={logo} className="sponsor-logo" alt="logo" />
        <img src={logo} className="sponsor-logo" alt="logo" />
        <img src={logo} className="sponsor-logo" alt="logo" />
        <img src={logo} className="sponsor-logo" alt="logo" />
      </div>
    </div>
  );
}

export default SponsorsBar;
