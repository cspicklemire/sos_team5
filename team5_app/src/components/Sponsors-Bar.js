import React from 'react';
import '../css/Sponsors-Bar.css';
import logo from '../img/sponsor-icon.png';

function SponsorsBar() {
  return (
    <div className='sponsor-background'>
      <div className='sponsor-background-2'>
        <img src={logo} className="sponsor-logo" alt="sponsor" />
      </div>
    </div>
  );
}

export default SponsorsBar;
