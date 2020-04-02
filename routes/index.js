const express = require('express');
const router = express.Router();

/* QUESTIONS ROUTES */
router.use('/questions', require('./questions/question'));

/* OPTIONS ROUTES */
router.use('/options', require('./options/option'));

module.exports = router;