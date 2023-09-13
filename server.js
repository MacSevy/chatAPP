const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve your chat_room.html and client.js as static files
app.use(express.static(__dirname)); // This serves files from the current directory
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages from clients
  socket.on('chat-message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat-message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
