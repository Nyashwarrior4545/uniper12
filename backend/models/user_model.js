// models/user_model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['employee', 'manager'], required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
