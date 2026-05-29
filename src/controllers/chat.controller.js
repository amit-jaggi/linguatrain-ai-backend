const sendChat = (req, res) => {
  res.status(200).json({
    message: 'Use WebSocket / socket.io for chat streaming'
  });
};

module.exports = { sendChat };