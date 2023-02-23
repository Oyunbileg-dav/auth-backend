const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    quizCode: {
        type: String,
        required: [true, "Please provide a quiz code!"],
        unique: [true, "Quiz code exists"]
    },
    quizPrompt: {
        type: String,
        required: [true, "Please provide a quiz prompt!"],
        unique: [true, "Quiz prompt exists"]
    },
    hint: {
        type: String,
        required: [true, "Please provide a hint!"],
        unique: false
    },
    options: {
        type: [String],
        required: [true, "Please provide options!"]
    },
    answer: {
        type: String,
        required: [true, "Please provide the quiz answer"]
    }
});

module.exports = mongoose.model.Quizzes || mongoose.model("Quizzes", QuizSchema);
