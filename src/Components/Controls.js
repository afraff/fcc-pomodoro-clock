import React from 'react';

const controls = (props) => (
    <div className='Controls'>
        <button id='start_stop' onClick={props.handlePlayPause}>{ props.active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span> }</button>
        <button id='reset' onClick={props.handleReset}>&#8635;</button>
  </div>
);

export default controls;