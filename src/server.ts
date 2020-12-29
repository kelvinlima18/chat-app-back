import express from 'express';
import routes from './routes';

import './database';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(routes);

io.on('connection', socket => {
  console.log('User connected');

  socket.on('messages', data => {
    io.sockets.emit('messages', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.listen(3030, () => {
  console.log('🚀 Server started on port 3030!');
});
