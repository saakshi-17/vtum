const FlashCard = require('../models/FlashCard');
const User = require('../models/User');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get flashcards for a specific subject and module
// @route   GET /api/v1/flashcards/:courseId/:semester/:subject/:module
// @access  Public
exports.getFlashCards = async (req, res, next) => {
  try {
    const { courseId, semester, subject, module } = req.params;
    const { difficulty, limit = 10 } = req.query;

    let query = {
      course: courseId,
      semester: parseInt(semester),
      subject: subject,
      module: module
    };

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const flashCards = await FlashCard.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Shuffle the flashcards for random order
    const shuffledCards = flashCards.sort(() => Math.random() - 0.5);

    res.status(200).json({
      success: true,
      count: shuffledCards.length,
      data: shuffledCards
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new flashcard
// @route   POST /api/v1/flashcards
// @access  Private
exports.createFlashCard = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id;

    const flashCard = await FlashCard.create(req.body);

    res.status(201).json({
      success: true,
      data: flashCard
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Complete a module and award points
// @route   POST /api/v1/flashcards/complete-module
// @access  Private
exports.completeModule = async (req, res, next) => {
  try {
    const { subject, module, score } = req.body;
    const userId = req.user.id;

    // Calculate points based on score (max 100 points)
    const points = Math.min(score, 100);

    // Update user's game stats
    const user = await User.findById(userId);
    
    // Check if module was already completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const alreadyCompleted = user.gameStats.completedModules.some(
      completed => 
        completed.subject === subject && 
        completed.module === module &&
        completed.completedAt >= today
    );

    if (alreadyCompleted) {
      return next(new ErrorResponse('Module already completed today', 400));
    }

    // Add completed module
    user.gameStats.completedModules.push({
      subject,
      module,
      points,
      completedAt: new Date()
    });

    // Update total points
    user.gameStats.totalPoints += points;

    // Update streak
    const lastPlayed = user.gameStats.lastPlayedDate;
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (!lastPlayed || lastPlayed < yesterday) {
      user.gameStats.streakCount = 1;
    } else if (lastPlayed >= yesterday && lastPlayed < today) {
      user.gameStats.streakCount += 1;
    }

    user.gameStats.lastPlayedDate = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        pointsEarned: points,
        totalPoints: user.gameStats.totalPoints,
        streakCount: user.gameStats.streakCount,
        message: `Congratulations! You earned ${points} points!`
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user's game statistics
// @route   GET /api/v1/flashcards/stats
// @access  Private
exports.getGameStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('gameStats name');

    // Calculate additional stats
    const totalModulesCompleted = user.gameStats.completedModules.length;
    const averageScore = totalModulesCompleted > 0 
      ? user.gameStats.completedModules.reduce((sum, module) => sum + module.points, 0) / totalModulesCompleted
      : 0;

    // Get recent completions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCompletions = user.gameStats.completedModules.filter(
      module => module.completedAt >= sevenDaysAgo
    );

    res.status(200).json({
      success: true,
      data: {
        totalPoints: user.gameStats.totalPoints,
        streakCount: user.gameStats.streakCount,
        totalModulesCompleted,
        averageScore: Math.round(averageScore),
        recentCompletions,
        lastPlayedDate: user.gameStats.lastPlayedDate
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get leaderboard
// @route   GET /api/v1/flashcards/leaderboard
// @access  Public
exports.getLeaderboard = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const topUsers = await User.find({})
      .select('name gameStats.totalPoints gameStats.streakCount')
      .sort({ 'gameStats.totalPoints': -1 })
      .limit(parseInt(limit));

    const leaderboard = topUsers.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.gameStats.totalPoints,
      streakCount: user.gameStats.streakCount
    }));

    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (err) {
    next(err);
  }
};