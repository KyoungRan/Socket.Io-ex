import React, { Component } from 'react';
import socketIOClinet from 'socket.io-client';
import ReactSpeedometer from 'react-d3-speedometer';

let socket = require('socket.io-client')('http://127.0.0.1:4001');

// starting speed at 0
let speed = 0;

// Simulating reading data every 100 milliseconds
setInterval(function () {
  // some sudo-randomness to change the values but not to drastically
  let nextMin = (speed-2) > 0 ? speed - 2 : 2;
  let nextMax = speed + 5 < 140 ? speed + 5 : Math.random() * (130 - 5 + 1) + 5;
  speed = Math.floor(Math.random() * (nextMax - nextMin + 1) + nextMin);

  // we emit the data. No need to JSON serialization!
  socket.emit('incoming data', speed);
}, 100);

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: 'http://127.0.0.1:4001'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    // Very simpoly connect to the socket
    const socket = socketIOClinet(endpoint);
    // Listen for data on the 'outgoing data' namespace and supply a callback
    // for what to do when we get one. In this case, we set a state variable 
    socket.on('outgoing data', data => this.setState({ response: data.num }));
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <ReactSpeedometer 
          maxValue = {140}
          value = {response}
          needleColor = 'black'
          startColor = 'orange'
          segments = {10}
          endColor = 'red'
          needleTransition = {'easeElastic'}
          ringWidth = {30}
          textColor = {'red'}
        />
      </div>
    )
  }
}

export default App;