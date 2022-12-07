const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    lessonCode: {
        type: String,
        required: [true, "Please provide a lesson code!"],
        unique: [true, "Lesson code exists"]
    },
    lessonName: {
        type: String,
        required: [true, "Please provide a lesson name!"],
        unique: [true, "Lesson name exists"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description!"],
        unique: false
    },
    duration: {
        type: String,
        required: [true, "Please provide the course duration"]
    },
    practiceLessons: [{type:mongoose.Schema.Types.ObjectId, ref:'Practices'}]
});

module.exports = mongoose.model.Lessons || mongoose.model("Lessons", LessonSchema);
