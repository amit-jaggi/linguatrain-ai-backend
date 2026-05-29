const express = require('express');
const router = express.Router();

const { getTip } = require('../controllers/tip.controller');

router.get('/', getTip);

module.exports = router;