const tips = require('../data/tips');

const getTip = (req, res) => {
  const random = tips[Math.floor(Math.random() * tips.length)];

  res.status(200).json({ tip: random });
};

module.exports = { getTip };