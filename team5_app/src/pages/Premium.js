import React from 'react';
import PremiumComp from '../components/Premium';
import Data from '../json/Premium.json';

function Premium() {
  return (
    <div>
      {Data.map( (deals, index) => {
        return <PremiumComp data={deals} key={index} />
      })}
    </div>
  );
}

export default Premium;
