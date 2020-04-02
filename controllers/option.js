const Question = require('./../models/question');
const Option = require('./../models/option');

/* ADD VOTE TO AN OPTION */
module.exports.addVote = async (req, res)=>{
    try {
        let option = await Option.findById(req.params.id);
        if(!option){
            throw new Error('Something went wrong, Option not Found!!');
        }
        option.votes = option.votes + 1;
        option.save();
        res.json({success: true, message: "Vote Added!!"});
    } catch (e) {
        console.log("Error while adding Vote to an Option.")
        return res.json({success: false, message: "Error while adding Vote to an Option.", error: e.message});
    }
}

/* DELETE AN OPTION */
module.exports.deleteOption = async (req, res)=>{
    try {
        let option = await Option.findById(req.params.id);
        if(!option){
            throw new Error('Something went wrong, Option not Found!!');
        }
        if(option.votes > 0){
            throw new Error("This option can't be deleted because it has votes.");
        }
        await option.remove();
        res.json({success: true, message: "Option is deleted."});
    } catch (e) {
        console.log("Error while deleting Option.")
        return res.json({success: false, message: "Error while deleting Option.", error: e.message});
    }
}