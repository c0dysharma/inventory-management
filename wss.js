import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';

// create webshockets server from express server
const server = http.createServer(app);
const io = new Server(server);

// socket.io connection events
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export { server, io };
