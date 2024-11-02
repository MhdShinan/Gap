// timeSlotModel.js
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const timeSlotSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // or false depending on whether it’s required
  },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true },
  
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
