const users = require('../data/users');
const quizzes = require('../data/quizes');

const getUserScores = (req, res) => {
  const { id } = req.params;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    user,
    attempts: quizzes
  });
};

module.exports = { getUserScores };