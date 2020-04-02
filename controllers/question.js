const Question = require('./../models/question');
const Option = require('./../models/option');

/* ADD QUESTION */
module.exports.addQuestion = async (req, res)=>{
    try {
        if(!req.body.title){
            throw new Error('Title field is required.');
        }
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
        res.json({success: true, message: "Question created!!"});
    } catch (e) {
        console.log("Error while creating Question.")
        return res.json({success: false, message: "Error while creating Question.", error: e.message});
    }
}

/* ADD OPTIONS */
module.exports.addOption = async (req, res)=>{
    try {
        if(!req.body.text){
            throw new Error('Text field is required.');
        }
        let question = await Question.findById(req.params.id);
        if(!question){
            throw new Error('Something went wrong, Question not Found!!');
        }
        let option = await Option.create({
            text: req.body.text,
            questionDetails: question
        })
        question.options.push(option);
        question.save();
        res.json({success: true, message: "New Option added!!"});
    } catch (e) {
        console.log("Error while creating Options.")
        return res.json({success: false, message: "Error while creating Options.", error: e.message});
    }
}

/* DELETE QUESTION */
module.exports.deleteQuestion = async (req, res)=>{
    
}