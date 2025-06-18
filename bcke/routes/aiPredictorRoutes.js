const express = require('express');
const {
  predictQuestions,
  getQuestionAnalysis
} = require('../controllers/aiPredictorController');

const router = express.Router();

router.post('/predict', predictQuestions);
router.get('/analysis/:courseId/:semester', getQuestionAnalysis);

module.exports = router;