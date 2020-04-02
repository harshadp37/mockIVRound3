const Question = require('./../models/question');
const Option = require('./../models/option');

/* GET QUESTION DETAILS & OPTIONS */
module.exports.getQuestion = async (req, res)=>{
    try {
        /* GET QUESTION WITH THE HELP OF PARAMS ID */
        let question = await Question.findById(req.params.id).populate({path: 'options'});

        /* IF QUESTION IS NOT FOUND THEN THROW ERROR */
        if(!question){
            throw new Error('Something went wrong, Question not Found!!');
        }

        /* SUCCESS RESPONSE */
        res.json({success: true, _id: question._id, Name: question.name, title: question.title, options: question.options});

    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while getting Question.")
        return res.json({success: false, message: "Error while getting Question.", error: e.message});
    }
}

/* ADD QUESTION */
module.exports.addQuestion = async (req, res)=>{
    try {
        /* IF TITLE IS NOT PROVIDED THEN THROW ERROR */
        if(!req.body.title){
            throw new Error('Title field is required.');
        }

        /* IF NAME IS PROVIDED THEN USE THAT NAME ELSE DEFAULT NAME WILL BE USED(Anonymous) DECLARED IN MODEL */
        if(req.body.name){
            await Question.create({
                title: req.body.title,
                name: req.body.name
            })
        }else{
            await Question.create({
                title: req.body.title
            })
        }

        /* SUCCESS RESPONSE */
        res.json({success: true, message: "Question created!!"});

    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while creating Question.")
        return res.json({success: false, message: "Error while creating Question.", error: e.message});
    }
}

/* ADD OPTIONS */
module.exports.addOption = async (req, res)=>{
    try {
        /* IF TEXT IS NOT PROVIDED THEN THROW ERROR */
        if(!req.body.text){
            throw new Error('Text field is required.');
        }
        
        /* GET QUESTION WITH THE HELP OF PARAMS ID */
        let question = await Question.findById(req.params.id);

        /* IF QUESTION IS NOT FOUND THEN THROW ERROR */
        if(!question){
            throw new Error('Something went wrong, Question not Found!!');
        }

        /* IF QUESTION IS FOUND THEN CREATE NEW OPTION */
        let option = await Option.create({
            text: req.body.text,
            questionDetails: question._id
        })

        /* PUSH NEW OPTION TO QUESTION'S OPTIONS ARRAY TOO & SAVE*/
        question.options.push(option);
        question.save();

        /* SUCCESS RESPONSE */
        res.json({success: true, message: "New Option added!!"});

    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while creating Options.")
        return res.json({success: false, message: "Error while creating Options.", error: e.message});
    }
}

/* DELETE QUESTION */
module.exports.deleteQuestion = async (req, res)=>{
    try {
        /* GET QUESTION WITH THE HELP OF PARAMS ID & POPULATE ONLY THOSE OPTIONS WHERE THERE IS ATLEAST ONE VOTE PRESENT */
        let question = await Question.findById(req.params.id).populate({path: 'options', match: {votes: {$gt: 0}}});

        /* IF QUESTION IS NOT FOUND THEN THROW ERROR */
        if(!question){
            throw new Error('Something went wrong, Question not Found!!');
        }

        /* IF QUESTION HAS ATLEAST ONE OPTION WITH VOTE > 0 THEN THROW ERROR */
        if(question.options.length > 0){
            throw new Error("This question can't be deleted because one of it's options has votes.");
        }

        /* DELETE ALL OPTIONS OF A QUESTION */
        await Option.deleteMany({questionDetails: question._id});

        /* DELETE QUESTION */
        await question.remove();

        /* SUCCESS RESPONSE */
        res.json({success: true, message: "Question and all it's options are deleted."});
        
    } catch (e) {
        /* ERROR RESPONSE */
        console.log("Error while deleting Question.")
        return res.json({success: false, message: "Error while deleting Question.", error: e.message});
    }
}