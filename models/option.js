const mongoose = require('mongoose');
const config = require('./../config');

const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    questionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
    linkToVote: {
        type: String
    }
})

optionSchema.pre('save', function(next){
    this.linkToVote = config.hostName + "/options/" + this._id + "/add_vote";
    next();
})

module.exports = mongoose.model('option', optionSchema);