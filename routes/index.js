const express = require('express');
const router = express.Router();

/* QUESTIONS ROUTES */
router.use('/questions', require('./question'));

/* OPTIONS ROUTES */
router.use('/options', require('./option'));

module.exports = router;