import React, { Component } from 'react';
import './App.css';
import moment from 'moment';

import SetTimer from './Components/SetTimer';
import Timer from './Components/Timer';
import Controls from './Components/Controls';

class App extends Component {
  state = {
    breakValue: 5,
    sessionValue: 25,
    mode: 'session',
    time: 25 * 60 * 1000,
    active: false,
    touched: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === 0 && prevState.mode === 'session') {
      this.setState({ time: this.state.breakValue * 60 * 1000, mode: 'break' })
      this.audio.play()
    }
    if (prevState.time === 0 && prevState.mode === 'break') {
      this.setState({ time: this.state.sessionValue * 60 * 1000, mode: 'session' })
      this.audio.play()
    }
  }

  setTimersHandler = (inc, type) => {
    if (inc && this.state[type] === 60) return
    if (!inc && this.state[type] === 1) return
    this.setState({ [type]: this.state[type] + (inc ? 1 : -1) })
  }

  playPauseHandler = () => {
    if (this.state.active) {
      this.setState({ active: false }, () => clearInterval(this.pomodoro))
    } 
    else {
      if (!this.state.touched) {
        this.setState({ 
          time: this.state.sessionValue * 60 * 1000, 
          active: true, 
          touched: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }) ,1000)
        )} else {
            this.setState({
              active: true,
              touched: true
            }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }) ,1000))
        }
    }
  }

  resetHandler = () => {
    this.setState({ 
      breakValue: 5, 
      sessionValue: 25, 
      time: 25 * 60 * 1000, 
      active: false, 
      mode: 'session',
      touched: false
    })
    this.audio.pause()
    this.audio.currentTime = 0
    clearInterval(this.pomodoro)
  }

  render() {
    return (
      <div className="App">
        <h1 id='header'>Pomodoro Clock</h1>
        <SetTimer 
          label='Session Length'
          type='session'
          value={this.state.sessionValue}
          handleClick={this.setTimersHandler} />
        <SetTimer 
          label='Break Length'
          type='break'
          value={this.state.breakValue}
          handleClick={this.setTimersHandler} />
        <div id='tomato'>
        <Timer
          mode={this.state.mode}
          time={moment(this.state.time).format('mm:ss')} />
        <Controls 
          active={this.state.active}
          handleReset={this.resetHandler}
          handlePlayPause={this.playPauseHandler}/>
        </div>
        <audio 
          id='beep'
          src='https://www.myinstants.com/media/sounds/alarm.mp3' 
          ref={ref => this.audio = ref}>
        </audio>
      </div>
    );
  }
}

export default App;
