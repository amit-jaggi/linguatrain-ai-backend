const mockResponses = {
  python: "Python is a high-level programming language used for automation, AI, and web development.",
  react: "React is a JavaScript library used for building UI components.",
  default: "I am a training bot. I can help you learn programming concepts."
};

function getMockResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('python')) return mockResponses.python;
  if (msg.includes('react')) return mockResponses.react;

  return mockResponses.default;
}

function streamText(socket, text) {
  let index = 0;

  socket.emit('stream_start');
  socket.emit('bot_typing');

  const interval = setInterval(() => {
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
    console.log('User connected:', socket.id);

    socket.on('send_message', (data) => {
      const { message, language } = data;

      const response = getMockResponse(message);

      // simulate delay
      setTimeout(() => {
        streamText(socket, response);
      }, 500);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = registerChatSocket;