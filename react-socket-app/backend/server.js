const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// out localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New client connected')

  socket.on('change color', (color) => {
    console.log('Color changed to: ', color)
    io.sockets.emit('change color', color)
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));