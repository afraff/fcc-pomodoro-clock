import React from 'react';

const timer = (props) => (
    <div className='Timer'>
        <h2 id='timer-label'>{props.mode === 'session' ? 'Session ' : 'Break '}</h2>
        <p id='time-left'>{props.time}</p>
    </div>
);

export default timer;