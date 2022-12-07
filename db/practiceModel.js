const mongoose = require('mongoose');

const PracticeSchema = new mongoose.Schema({
    practiceCode: {
        type: String,
        required: [true, "Please provide a practice session code"],
        unique: [true, "Practice session code exists"]
    },
    practiceName: {
        type: String,
        required: [true, "Please provide a practice name!"],
        unique: [true, "Practice name exists"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description!"],
        unique: false
    },
    duration: {
        type: String,
        required: [true, "Please provide the course duration"]
    }
});

module.exports = mongoose.model.Practices || mongoose.model("Practices", PracticeSchema);
