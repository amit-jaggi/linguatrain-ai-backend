const express = require('express');
const router = express.Router();

const { getUserScores } = require('../controllers/user.controller');

router.get('/:id/scores', getUserScores);

module.exports = router;