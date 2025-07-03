const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, maxlength: 20, required: true },
  math: { type: Number, min: 0, max: 100 },
  science: { type: Number, min: 0, max: 100 },
  english: { type: Number, min: 0, max: 100 },
  total: Number,
  grade: String,
});

module.exports = mongoose.model('Student', studentSchema);
