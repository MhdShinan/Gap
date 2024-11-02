const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting.js");
const Session = require("../models/Session.js");
const SateSession = require("../models/StatusSession.js");

const { google } = require('googleapis');
const dayjs = require('dayjs');
const { v4: uuid } = require('uuid');
const sendMails = require("../utils/sendMails.js");

// Middleware to parse JSON bodies
router.use(express.json());

// OAuth2 Client setup
const oauth2Client = new google.auth.OAuth2(
  process.env.MEETING_ID,
  process.env.MEETING_SECRET,
  process.env.REDIRECT_URL
);

const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

// Google Auth Login
router.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  });
  res.redirect(url);
});

// Redirect Page (Updated to send the user back to the frontend)
router.get('/google/redirect', async (req, res) => {
  const tokenCode = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(tokenCode);
    oauth2Client.setCredentials(tokens);

    // Redirect the user to the frontend with the access token as a query parameter
    res.redirect(`http://localhost:3000/receviedmentor?access_token=${tokens.access_token}`);
  } catch (error) {
    console.error('Error during Google OAuth redirect:', error);
    res.status(500).send('Error during authentication');
  }
});

// Schedule Meeting
router.post('/scheduleEvent', async (req, res) => {
  const { summary, description, start, end, attendees, userName, academicDetails, scheduledStartTime, scheduledEndTime, scheduledDate, userEmail } = req.body;

  try {
    const response = await google.calendar('v3').events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      conferenceDataVersion: 1,
      requestBody: {
        summary: summary || "Default Event Summary",
        description: description || "Default Event Description",
        start: {
          dateTime: start || dayjs().add(1, 'day').toISOString(),
        },
        end: {
          dateTime: end || dayjs().add(1, 'day').add(1, 'hour').toISOString(),
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          }
        },
        attendees: attendees || []
      }
    });

    const eventLink = response.data.htmlLink;

    // Extract the Google Meet link from the response
    const meetLink = response.data.conferenceData
      ? response.data.conferenceData.entryPoints.find(point => point.entryPointType === 'video').uri
      : null;

    // Create the email body with the event link included
    const emailBody = `
       Meeting Invitation: ${summary}
     
       Description: ${description}
     
       Start Time: ${scheduledStartTime}
     
       End Time: ${scheduledEndTime}
     
       Attendees:
       ${attendees.map(attendee => `- ${attendee.email}`).join('\n')}
     
       Event Link: ${meetLink} (Join the Meeting)
     
       Please make sure to be available at the specified time.
     `;

    // Send the email
    await sendMails({
      email: process.env.ADMIN_EMAIL, // Send to admin email
      subject: `Meeting Invitation: ${summary}`, // Email subject
      message: emailBody, // Email body including the event link
    });

    // Send the email to each attendee
    for (const attendee of attendees) {
      await sendMails({
        email: attendee.email,  // Send to each attendee's email
        subject: `Meeting Invitation: ${summary}`,  // Email subject
        message: emailBody  // Email body including the event link
      });
    }

    // Respond to the client
    res.status(201).json({
      status: "ok",
      success: true,
      message: `Meeting details have been sent to ${process.env.ADMIN_EMAIL}`,
    });

    // Convert start and end to Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format');
    }

    // Save event data to MongoDB
    const newMeeting = new Meeting({
      summary: summary,
      description: description,
      start: startDate,  // Use startDate instead of start
      end: endDate,      // Use endDate instead of end
      attendees: attendees.map(attendee => attendee.email),
      eventLink: eventLink,
      meetLink: meetLink,
      userName: userName,
      academicDetails: academicDetails,
      scheduledStartTime: scheduledStartTime,
      scheduledEndTime: scheduledEndTime,
      scheduledDate: scheduledDate,
      userEmail: userEmail



    });

    await newMeeting.save();

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send({
      error: 'Error creating event',
      details: error.message
    });
  }
});


router.post('/meetings', async (req, res) => {
  const { emails } = req.body; // Expecting an array of emails

  try {
    const meetings = await Meeting.find({ attendees: { $in: emails } });
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meetings', error });
  }
});


router.post('/scheduleSession', async (req, res) => {
  try {
    const { summary, description, startTime, endTime, userEmail, mentorEmail, userName, date, academicDetails, profilePicture } = req.body;

    // Create a new session instance
    const newSession = new Session({
      summary: summary,
      description: description,
      startTime: startTime,  // Use startDate and convert to Date
      endTime: endTime,      // Use endDate and convert to Date
      userEmail: userEmail,
      mentorEmail: mentorEmail,
      userName: userName,
      date: date,
      academicDetails: academicDetails,
      profilePicture: profilePicture
    });

    // Save the session to MongoDB
    await newSession.save();

    // Send a success response
    res.status(201).json({ message: 'Session scheduled successfully', session: newSession });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Failed to schedule session', error: error.message });
  }
});

router.post('/sessionsReceived', async (req, res) => {
  const { emails } = req.body; // Expecting an array of emails

  try {
    const sessions = await Session.find({
      $or: [
        { userEmail: { $in: emails } }, // Check if userEmail is in the provided emails
        { mentorEmail: { $in: emails } } // Check if mentorEmail is in the provided emails
      ]
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sessions', error });
  }
});


// Fetch past meetings (meetings that have ended before the current time and date)
router.get('/pastmeeting', async (req, res) => {
  try {
    // Get current date and time
    const currentDateTime = new Date();

    // Fetch meetings where scheduledDate and scheduledEndTime are both before the current date and time
    const pastMeetings = await Meeting.find({
      $or: [
        { scheduledDate: { $lt: currentDateTime.toISOString().split('T')[0] } }, // Meetings with a past date
        {
          scheduledDate: currentDateTime.toISOString().split('T')[0], // Meetings on the current date
          scheduledEndTime: { $lt: currentDateTime.toISOString().split('T')[1] } // But whose end time is in the past
        }
      ]
    });

    if (pastMeetings.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No past meetings found'
      });
    }

    res.status(200).json({
      success: true,
      data: pastMeetings
    });
  } catch (error) {
    console.error('Error fetching past meetings:', error);
    res.status(500).send({
      error: 'Error fetching past meetings',
      details: error.message
    });
  }
});

router.get('/seperateEmails', async (req, res) => {
  try {
    // Fetch all sessions and select only userEmail and mentorEmail fields
    const sessions = await SateSession.find({}, 'userEmail mentorEmail');

    // Respond with the data
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Server error. Could not fetch emails.' });
  }
});





module.exports = router;
