import React from 'react';

const setTimer = (props) => (
    <div className='setTimer'>
        <h2 id={`${props.type}-label`}>{props.label}</h2>
        <div className='SetTimer-controls'>
            <button id={`${props.type}-decrement`} onClick={() => props.handleClick(false, `${props.type}Value`)}>-</button>
            <p id={`${props.type}-length`}>{props.value}</p>
            <button id={`${props.type}-increment`} onClick={() => props.handleClick(true, `${props.type}Value`)}>+</button>
        </div>
    </div>
);

export default setTimer;