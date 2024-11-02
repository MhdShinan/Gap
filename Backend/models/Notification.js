const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  isRead: { type: Boolean, default: false },
  profilePicture: { type: String, required: true },  
  timestamp: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
