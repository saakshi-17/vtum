const QuestionPaper = require('../models/QuestionPaper');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Predict upcoming questions using AI analysis
// @route   POST /api/v1/ai-predictor/predict
// @access  Public
exports.predictQuestions = async (req, res, next) => {
  try {
    const { courseId, semester, examType = 'external' } = req.body;

    // Get historical question papers
    const questionPapers = await QuestionPaper.find({
      course: courseId,
      semester: semester,
      examType: examType
    }).sort({ year: -1 }).limit(10);

    if (questionPapers.length === 0) {
      return next(new ErrorResponse('No historical data found for prediction', 404));
    }

    // Analyze question patterns
    const analysis = analyzeQuestionPatterns(questionPapers);
    
    // Generate predictions
    const predictions = generatePredictions(analysis);

    res.status(200).json({
      success: true,
      data: {
        predictions,
        confidence: analysis.confidence,
        basedOnPapers: questionPapers.length,
        analysis: {
          frequentTopics: analysis.frequentTopics,
          moduleDistribution: analysis.moduleDistribution,
          difficultyTrends: analysis.difficultyTrends
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get question analysis for a specific course and semester
// @route   GET /api/v1/ai-predictor/analysis/:courseId/:semester
// @access  Public
exports.getQuestionAnalysis = async (req, res, next) => {
  try {
    const { courseId, semester } = req.params;

    const questionPapers = await QuestionPaper.find({
      course: courseId,
      semester: semester
    }).populate('course', 'name code');

    const analysis = analyzeQuestionPatterns(questionPapers);

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (err) {
    next(err);
  }
};

// Helper function to analyze question patterns
function analyzeQuestionPatterns(questionPapers) {
  const allQuestions = questionPapers.flatMap(paper => paper.questions);
  
  // Keyword frequency analysis
  const keywordFreq = {};
  const moduleFreq = {};
  const difficultyFreq = { easy: 0, medium: 0, hard: 0 };
  const questionTypeFreq = {};

  allQuestions.forEach(question => {
    // Count keywords
    question.keywords.forEach(keyword => {
      keywordFreq[keyword] = (keywordFreq[keyword] || 0) + 1;
    });

    // Count modules
    moduleFreq[question.module] = (moduleFreq[question.module] || 0) + 1;

    // Count difficulty
    difficultyFreq[question.difficulty]++;

    // Count question types
    questionTypeFreq[question.questionType] = (questionTypeFreq[question.questionType] || 0) + 1;
  });

  // Sort by frequency
  const frequentTopics = Object.entries(keywordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([keyword, freq]) => ({ keyword, frequency: freq }));

  const moduleDistribution = Object.entries(moduleFreq)
    .sort(([,a], [,b]) => b - a)
    .map(([module, count]) => ({ module, count, percentage: (count / allQuestions.length * 100).toFixed(1) }));

  return {
    totalQuestions: allQuestions.length,
    totalPapers: questionPapers.length,
    frequentTopics,
    moduleDistribution,
    difficultyTrends: difficultyFreq,
    questionTypeDistribution: questionTypeFreq,
    confidence: calculateConfidence(questionPapers.length, allQuestions.length)
  };
}

// Helper function to generate predictions
function generatePredictions(analysis) {
  const predictions = [];

  // High probability questions based on frequent topics
  analysis.frequentTopics.slice(0, 5).forEach((topic, index) => {
    predictions.push({
      type: 'high-probability',
      topic: topic.keyword,
      probability: Math.max(85 - (index * 5), 60),
      reason: `Appeared in ${topic.frequency} previous questions`,
      suggestedPreparation: `Focus on ${topic.keyword} concepts and practice problems`
    });
  });

  // Module-based predictions
  analysis.moduleDistribution.slice(0, 3).forEach((module, index) => {
    predictions.push({
      type: 'module-based',
      module: module.module,
      probability: Math.max(75 - (index * 10), 50),
      reason: `${module.percentage}% of questions from this module`,
      suggestedPreparation: `Complete revision of ${module.module}`
    });
  });

  // Difficulty trend predictions
  const mostCommonDifficulty = Object.entries(analysis.difficultyTrends)
    .sort(([,a], [,b]) => b - a)[0];

  predictions.push({
    type: 'difficulty-trend',
    difficulty: mostCommonDifficulty[0],
    probability: 70,
    reason: `${mostCommonDifficulty[0]} questions are most common`,
    suggestedPreparation: `Prepare for ${mostCommonDifficulty[0]} level questions`
  });

  return predictions.sort((a, b) => b.probability - a.probability);
}

// Helper function to calculate confidence score
function calculateConfidence(paperCount, questionCount) {
  if (paperCount >= 5 && questionCount >= 50) return 'high';
  if (paperCount >= 3 && questionCount >= 30) return 'medium';
  return 'low';
}