const express = require('express');
const router = express.Router();
const questionController = require('./../../controllers/question');

/* ADD QUESTION */
router.post('/create', questionController.addQuestion);

/* ADD OPTION */
router.post('/:id/options/create', questionController.addOption);

/* DELETE QUESTION */
router.post('/:id/delete', questionController.deleteQuestion);

module.exports = router;