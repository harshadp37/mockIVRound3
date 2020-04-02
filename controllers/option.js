const Option = require('./../models/option');

/* ADD VOTE TO AN OPTION */
module.exports.addVote = async (req, res)=>{
    try {
        /* GET OPTION WITH THE HELP OF PARAMS ID */
        let option = await Option.findById(req.params.id);
        
        /* IF OPTION IS NOT FOUND THEN THROW ERROR */
        if(!option){
            throw new Error('Something went wrong, Option not Found!!');
        }

        /* INCREASE VOTE BY 1 && SAVE */
        option.votes = option.votes + 1;
        option.save();

        /* SUCCESS RESPONSE */
        res.json({success: true, message: "Vote Added!!"});

    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while adding Vote to an Option.")
        return res.json({success: false, message: "Error while adding Vote to an Option.", error: e.message});
    }
}

/* DELETE AN OPTION */
module.exports.deleteOption = async (req, res)=>{
    try {
        /* GET OPTION WITH THE HELP OF PARAMS ID */
        let option = await Option.findById(req.params.id);
        
        /* IF OPTION IS NOT FOUND THEN THROW ERROR */
        if(!option){
            throw new Error('Something went wrong, Option not Found!!');
        }
        
        /* IF OPTION HAS ATLEAST ONE VOTE THEN THROW ERROR */
        if(option.votes > 0){
            throw new Error("This option can't be deleted because it has votes.");
        }

        /* DELETE OPTION */
        await option.remove();

        /* SUCCESS RESPONSE */
        res.json({success: true, message: "Option is deleted."});

    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while deleting Option.")
        return res.json({success: false, message: "Error while deleting Option.", error: e.message});
    }
}