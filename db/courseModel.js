const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: [true, "Please provide a course code!"],
        unique: [true, "Course code exists"]
    },
    courseName: {
        type: String,
        required: [true, "Please provide a course name!"],
        unique: [true, "Course name exists"]
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
    lessons: [{type: mongoose.Schema.Types.ObjectId, ref:'Lessons'}]
});

module.exports = mongoose.model.Courses || mongoose.model("Courses", CourseSchema);
