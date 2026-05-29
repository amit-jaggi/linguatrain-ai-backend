// server.js file is used to the server

const app = require('./src/app'); // importing the app-module (server-instance)
const http = require('http');
const { Server } = require('socket.io');
const registerChatSocket = require('./src/socket/chat.Socket');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
});

registerChatSocket(io);



server.listen(PORT, () => {
  console.log(`linguatrain-ai-backend server is running on http://localhost:${PORT}`);
});

