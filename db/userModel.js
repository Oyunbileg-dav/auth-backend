const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: [true, "Email exists"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false
    },
    courses: [{type: mongoose.Schema.Types.ObjectId, ref:'Courses'}]
});

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);


