const mongoose = require('mongoose');


const meetingSchema = new mongoose.Schema({
    summary: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    attendees: [{ type: String, required: true }],  // Array of attendee emails
    eventLink: { type: String, required: true },   // Link to the event
    meetLink: { type: String, required: true },    // Google Meet link
    userName: { type: String, required: true }, 
    academicDetails: { type: String, required: true },
    scheduledStartTime: { type: String, required: true }, 
    scheduledEndTime: { type: String, required: true }, 
    scheduledDate: { type: String, required: true },
    userEmail: { type: String, required: true },   
}, { timestamps: true }); // Automatically creates `createdAt` and `updatedAt` fields


const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;