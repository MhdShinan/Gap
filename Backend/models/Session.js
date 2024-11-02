const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    summary: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true},
    endTime: { type: String, required: true },
    userEmail: { type: String, required: true },
    mentorEmail: { type: String, required: true },
    userName: { type: String, required: true }, 
    date: { type: String, required: true },
    academicDetails: { type: String, required: true },
    profilePicture: { type: String, required: true }, 
}, { timestamps: true }); // Automatically creates `createdAt` and `updatedAt` fields


const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;