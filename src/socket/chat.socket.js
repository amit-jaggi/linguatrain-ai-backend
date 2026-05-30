const mockResponses = {
  python: "Python is a high-level programming language used for automation, AI, and web development.",
  react: "React is a JavaScript library used for building UI components.",
  default: "I am a training bot. I can help you learn programming concepts."
};

function getMockResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('python')) {
    return mockResponses.python;
  }

  if (msg.includes('react')) {
    return mockResponses.react;
  }

  return mockResponses.default;
}

function streamThinking(socket) {
  socket.emit('bot_thinking');
}

function streamText(socket, text) {
  let index = 0;

  socket.emit('stream_start');
  socket.emit('bot_typing');

  const interval = setInterval(() => {
    // if socket disconnected stop stream
    if (!socket.connected) {
      clearInterval(interval);

      console.log('Stream stopped due to disconnect');
      return;
    }

    if (index < text.length) {
      socket.emit('stream_token', text[index]);
      index++;
    } else {
      clearInterval(interval);

      socket.emit('stream_end', {
        text,
        source: 'mock-knowledge-base.md'
      });
    }
  }, 20);
}

function registerChatSocket(io) {
  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // OPTIONAL
    socket.emit('connected_successfully', {
      socketId: socket.id,
    });

    socket.on('send_message', (data) => {
      try {
        streamThinking(socket);

        const { message } = data;

        const response = getMockResponse(message);

        setTimeout(() => {
          if (socket.connected) {
            streamText(socket, response);
          }
        }, 1000);

      } catch (error) {
        console.log(error);
        socket.emit('server_error', {
          message: 'Something went wrong',
        });
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('❌ User disconnected:', reason);
    });
  });
}

module.exports = registerChatSocket;