const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "Anonymous"
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option'
    }]
})

module.exports = mongoose.model('question', questionSchema);