const express = require('express');
const {
  getQuestionPapers,
  getQuestionPaper,
  addQuestionPaper,
  updateQuestionPaper,
  deleteQuestionPaper
} = require('../controllers/questionPaperController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const upload = require('../utils/upload');

router
  .route('/')
  .get(getQuestionPapers)
  .post(protect, authorize('student', 'admin'), upload.single('file'), addQuestionPaper);

router
  .route('/:id')
  .get(getQuestionPaper)
  .put(protect, authorize('student', 'admin'), updateQuestionPaper)
  .delete(protect, authorize('student', 'admin'), deleteQuestionPaper);

module.exports = router;