import React from 'react';
import Sponsor from '../components/Sponsor.js';
import Data from '../json/Sponsors.json';

function Sponsors() {
  return (
    <div className='basic-page'>
      {Data.map( (object, index) => {
        return <Sponsor data={object} key={index} />
      })}
    </div>
  );
}

export default Sponsors;
