const mongoose = require('mongoose');

const QuestionPaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: true,
  },
  semester: {
    type: Number,
    required: [true, 'Please add a semester'],
    min: [1, 'Semester must be at least 1'],
    max: [8, 'Semester cannot be more than 8'],
  },
  year: {
    type: Number,
    required: [true, 'Please add the year'],
  },
  examType: {
    type: String,
    enum: ['internal', 'external', 'model'],
    required: true,
  },
  questions: [{
    questionText: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    keywords: [String],
    questionType: {
      type: String,
      enum: ['short-answer', 'long-answer', 'numerical', 'diagram'],
      default: 'long-answer',
    }
  }],
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  file: {
    public_id: String,
    url: String,
    format: String,
    size: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better search performance
QuestionPaperSchema.index({ course: 1, semester: 1, year: -1 });
QuestionPaperSchema.index({ 'questions.keywords': 1 });

module.exports = mongoose.model('QuestionPaper', QuestionPaperSchema);