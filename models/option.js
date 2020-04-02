const mongoose = require('mongoose');
const config = require('./../config');

/* OPTION SCHEMA */
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

/* WHILE SAVING NEW OPTION ADD LINK_TO_VOTE WITH IT'S ID */ 
optionSchema.pre('save', function(next){
    if(!this.linkToVote){
        this.linkToVote = config.hostName + "/options/" + this._id + "/add_vote";
    }
    next();
})

module.exports = mongoose.model('option', optionSchema);