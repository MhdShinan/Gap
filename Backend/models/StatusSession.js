const mongoose = require('mongoose');

const StatusSessionSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    userEmail: { type: String, required: true },
    mentorEmail: { type: String, required: true },
    userName: { type: String, required: true },
    date: { type: String, required: true },
    academicDetails: { type: Array, required: true },
    status: { 
        type: String, 
        enum: ['accepted', 'declined'], // Ensure 'accepted' and 'declined' are included here
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('StatusSession', StatusSessionSchema);
