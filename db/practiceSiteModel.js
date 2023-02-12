const mongoose = require('mongoose');

const PracticeSiteSchema = new mongoose.Schema({
    practiceSiteCode: {
        type: String,
        required: [true, "Please provide a practice site code"],
        unique: [true, "Practice site code exists"]
    },
    practiceSiteName: {
        type: String,
        required: [true, "Please provide a practice site name!"],
        unique: [true, "Practice name exists"]
    },
    description: {
        type: String,
        required: [false, "Please provide a description!"],
        unique: false
    },
    address: {
        type: String,
        required: [true, "Please provide the address"]
    }
});

module.exports = mongoose.model.PracticeSites || mongoose.model("PracticeSites", PracticeSiteSchema);
