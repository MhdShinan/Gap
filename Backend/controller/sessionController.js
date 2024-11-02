const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const StatusSession = require('../models/StatusSession'); // Import StatusSession model

// GET all sessions
router.get('/email/:email', async (req, res) => {
    const { email } = req.params; // Extract the email from the request parameters
    try {
        const sessions = await Session.find({ userEmail: email }); // Find sessions by userEmail
        if (sessions.length === 0) {
            return res.status(404).json({ message: "No sessions found for this email." });
        }
        res.status(200).json(sessions); // Return the sessions
    } catch (error) {
        console.error("Error fetching sessions by email:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST decline session by ID
router.post('/decline/:id', async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Create a declined session in StatusSession
        const declinedSession = new StatusSession({
            sessionId: session._id,
            summary: session.summary,
            description: session.description,
            startTime: session.startTime,
            endTime: session.endTime,
            userEmail: session.userEmail,
            mentorEmail: session.mentorEmail,
            userName: session.userName,
            date: session.date,
            academicDetails: session.academicDetails,
            status: 'declined' // Set status to 'declined'
        });

        // Save the declined session
        await declinedSession.save();

        // Delete the original session
        await Session.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Session declined and moved to StatusSession' });
    } catch (error) {
        console.error("Error declining session:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});




// POST accept session by ID
router.post('/accept/:id', async (req, res) => {
    console.log("Accept route hit for session ID:", req.params.id);
    try {
        const session = await Session.findById(req.params.id);
        console.log("Fetched session:", session); // Log the fetched session

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Create an accepted session in StatusSession
        const acceptedSession = new StatusSession({
            sessionId: session._id,
            summary: session.summary,
            description: session.description,
            startTime: session.startTime,
            endTime: session.endTime,
            userEmail: session.userEmail,
            mentorEmail: session.mentorEmail,
            userName: session.userName,
            date: session.date,
            academicDetails: session.academicDetails,
            status: 'accepted' // Set status to 'accepted'
        });

        // Log before saving the accepted session
        console.log("Saving accepted session:", acceptedSession);

        // Save the accepted session
        await acceptedSession.save();

        // Log after saving
        console.log("Accepted session saved successfully");

        // Delete the original session
        await Session.findByIdAndDelete(req.params.id);
        console.log("Original session deleted");

        res.status(200).json({ message: 'Session accepted and moved to StatusSession' });
    } catch (error) {
        console.error("Error accepting session:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});



// GET declined sessions by userEmail
router.get('/declined/:email', async (req, res) => {
    const { email } = req.params; // Extract the email from the request parameters
    try {
        const declinedSessions = await StatusSession.find({ status: 'declined', userEmail: email }); // Fetch declined sessions filtered by userEmail
        if (declinedSessions.length === 0) {
            return res.status(404).json({ message: "No declined sessions found for this email." });
        }
        res.status(200).json(declinedSessions);
    } catch (error) {
        console.error("Error fetching declined sessions:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET accepted sessions by userEmail
router.get('/accepted/:email', async (req, res) => {
    const { email } = req.params; // Extract the email from the request parameters
    try {
        const acceptedSessions = await StatusSession.find({ status: 'accepted', userEmail: email }); // Fetch accepted sessions filtered by userEmail
        if (acceptedSessions.length === 0) {
            return res.status(404).json({ message: "No accepted sessions found for this email." });
        }
        res.status(200).json(acceptedSessions);
    } catch (error) {
        console.error("Error fetching accepted sessions:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});



// DELETE a session by sessionId from StatusSession
router.delete('/declined/:id', async (req, res) => {
    try {
        const deletedSession = await StatusSession.findByIdAndDelete(req.params.id);

        if (!deletedSession) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Declined session deleted successfully' });
    } catch (error) {
        console.error("Error deleting declined session:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE session by ID
router.delete('/:id', async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Delete the session
        await Session.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
