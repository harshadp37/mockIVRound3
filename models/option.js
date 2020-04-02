const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
    },
    linkToVote: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('option', optionSchema);