const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:19006"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('messageSent', (msg) => {
    console.log('message: ' + msg.content);

    socket.broadcast.emit(`messageReceived:${msg.conversationId}`, msg);
  });
});

server.listen(3000);