// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    strengths: [String],
    weaknesses: [String],
    learningStyle: String
});

module.exports = mongoose.model('User', userSchema);
