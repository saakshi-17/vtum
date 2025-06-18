const express = require('express');
const {
  getFlashCards,
  createFlashCard,
  completeModule,
  getGameStats,
  getLeaderboard
} = require('../controllers/flashCardController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/:courseId/:semester/:subject/:module', getFlashCards);
router.post('/', protect, createFlashCard);
router.post('/complete-module', protect, completeModule);
router.get('/stats', protect, getGameStats);
router.get('/leaderboard', getLeaderboard);

module.exports = router;