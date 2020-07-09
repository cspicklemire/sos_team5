import React, { useState, useEffect } from 'react';

function StreamLive( {match} ) {
  return (
    <div>
      <h1> { `Live Video Stream ${match.params.id}` } </h1>
    </div>
  );
}

export default StreamLive;
