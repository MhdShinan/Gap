const express = require("express");
const mongoose = require("mongoose");
const TimeSlot = require("../models/timeSlotModel");
const router = express.Router();

// Create a new time slot
router.post("/timeslots", async (req, res) => {
  console.log("Request body:", req.body); // Log the entire request body

  const { date, startTime, duration, user } = req.body;

  // Check for missing fields
  if (!date || !startTime || !duration || !user) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validate user field
  if (typeof user !== "string" || !mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const newTimeSlot = new TimeSlot({
    date,
    startTime,
    duration,
    user,
  });
  console.log("User ID:", user);

  try {
    const savedTimeSlot = await newTimeSlot.save();
    res.status(201).json(savedTimeSlot);
  } catch (error) {
    console.error("Error details:", error); // Enhanced logging
    res.status(500).json({ error: "Failed to create time slot", details: error.message });
  }
});

// Fetch all time slots for a specific user
router.get("/timeslots/:userId", async (req, res) => {
  const { userId } = req.params;

  // Validate user ID
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const timeSlots = await TimeSlot.find({ user: userId });
    res.status(200).json(timeSlots);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ error: "Failed to fetch time slots", details: error.message });
  }
});

// Update an existing time slot
router.put("/timeslots/:id", async (req, res) => {
  const { date, startTime, duration, user } = req.body;
  const { id } = req.params;

  if (!date || !startTime || !duration) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validate user field
  if (typeof user !== "string" || !mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(
      id,
      { date, startTime, duration, user },
      { new: true, runValidators: true }
    );
    
    if (!updatedTimeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json(updatedTimeSlot);
  } catch (error) {
    console.error("Error updating time slot:", error);
    res.status(500).json({ error: "Failed to update time slot", details: error.message });
  }
});

// Fetch all time slots where the date is today or in the future
router.get("/timeslots", async (req, res) => {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Fetch time slots where the date is today or in the future
    const timeSlots = await TimeSlot.find({
      date: { $gte: today }
    }).sort({ date: 1, startTime: 1 }); // Sort by date and time

    res.status(200).json(timeSlots);
  } catch (error) {
    console.error("Error fetching time slots:", error);
    res.status(500).json({ error: "Failed to fetch time slots", details: error.message });
  }
});

// Delete an existing time slot
router.delete("/timeslots/:id", async (req, res) => {
  const { id } = req.params;

  // Validate the time slot ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid time slot ID" });
  }

  try {
    // Find and delete the time slot by its ID
    const deletedTimeSlot = await TimeSlot.findByIdAndDelete(id);

    if (!deletedTimeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    res.status(200).json({ message: "Time slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting time slot:", error);
    res.status(500).json({ error: "Failed to delete time slot", details: error.message });
  }
});



module.exports = router;
