const mongoose = require('mongoose');

const FlashCardSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  module: {
    type: String,
    required: [true, 'Please add a module'],
  },
  question: {
    type: String,
    required: [true, 'Please add a question'],
  },
  answer: {
    type: String,
    required: [true, 'Please add an answer'],
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium',
  },
  keywords: [String],
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better performance
FlashCardSchema.index({ subject: 1, module: 1 });
FlashCardSchema.index({ keywords: 1 });

module.exports = mongoose.model('FlashCard', FlashCardSchema);