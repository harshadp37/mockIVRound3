const express = require('express');
const router = express.Router();

router.use('/questions', require('./questions/question'));
router.use('/options', require('./options/option'));

module.exports = router;