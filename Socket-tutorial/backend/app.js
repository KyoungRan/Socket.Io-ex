const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Port from environment variable or default - 4001
const port = process.env.PORT || 4001;
const index = require('./routes/index');

// Setting up express and adding socketIo middleware
const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

// Setting up a socket with the namespace 'connection' for new sockets
io.on('connection', socket => {
  console.log('New client connected');

  // Here we listen on a new namespace called 'incoming data'
  socket.on('incoming data', (data) => {
    socket.broadcast.emit('outgoing data', { num: data });
    console.log(data)
  });

  // A special namespace 'disconnect' for when a client disconnects
  socket.on('disconnect', () => console.log('client disconnected'));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

// let socket = require('socket.io-client')('http://127.0.0.1:4001');

// // starting speed at 0
// let speed = 0;

// // Simulating reading data every 100 milliseconds
// setInterval(function () {
//   // some sudo-randomness to change the values but not to drastically
//   let nextMin = (speed-2) > 0 ? speed - 2 : 2;
//   let nextMax = speed + 5 < 140 ? speed + 5 : Math.random() * (130 - 5 + 1) + 5;
//   speed = Math.floor(Math.random() * (nextMax - nextMin + 1) + nextMin);

//   // we emit the data. No need to JSON serialization!
//   socket.emit('incoming data', speed);
// }, 100);
