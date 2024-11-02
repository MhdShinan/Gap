const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require('../models/User');
require("dotenv").config();

// Route to handle successful login
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Login Success",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

// Route to handle failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login Failed",
  });
});

// Route to handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: 'http://localhost:3000/login' }),
  async (req, res) => {
    const { sub: googleId, given_name: firstName, family_name: lastName, email, picture: profilePhoto } = req.user;

    // Create a username from Google profile data (if not present)
    const username = `${firstName} ${lastName}`;

    // Check if user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // Create a new user if not found
      user = new User({
        googleId,
        firstName,
        lastName,
        username,
        email, // Directly use email from Google profile
        profilePhoto
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        googleId,
        firstName,
        lastName,
        username,
        profilePhoto
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect with token
    res.redirect(`http://localhost:3000/home?token=${token}`);
  }
);

// Route to start Google OAuth authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Route to handle logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

// Route to get user details
router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ googleId: req.user.googleId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
