const express = require('express');
const router = express.Router();
const optionController = require('./../controllers/option');

/* ADD VOTE TO AN OPTION */
router.put('/:id/add_vote', optionController.addVote);

/* DELETE AN OPTION */
router.delete('/:id/delete', optionController.deleteOption);

module.exports = router;