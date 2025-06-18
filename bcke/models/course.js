const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please add a course code'],
    unique: true,
    trim: true,
    maxlength: [10, 'Course code cannot be more than 10 characters'],
  },
  name: {
    type: String,
    required: [true, 'Please add a course name'],
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters'],
  },
  semester: {
    type: Number,
    required: [true, 'Please add a semester'],
    min: [1, 'Semester must be at least 1'],
    max: [8, 'Semester must can not be more than 8'],
  },
  department: {
    type: String,
    required: [true, 'Please add a department'],
    enum: [
      'CSE',
      'ISE',
      'ECE',
      'EEE',
      'MECH',
      'CIVIL',
      'AERO',
      'BT',
      'IEM',
      'IP',
    ],
  },
});

module.exports = mongoose.model('Course', CourseSchema);