const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question');

/* SHOW QUESTION WITH OPTIONS */
router.get('/:id', questionController.getQuestion);

/* ADD QUESTION */
router.post('/create', questionController.addQuestion);

/* ADD OPTION */
router.post('/:id/options/create', questionController.addOption);

/* DELETE QUESTION */
router.delete('/:id/delete', questionController.deleteQuestion);

module.exports = router;