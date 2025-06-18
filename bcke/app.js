// app.js

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');

// Route files
const auth = require('./routes/authRoutes');
const materials = require('./routes/materialRoutes');
const questionPapers = require('./routes/questionPaperRoutes');
const aiPredictor = require('./routes/aiPredictorRoutes');
const flashCards = require('./routes/flashCardRoutes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Sanitize data
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);

// Prevent HTTP parameter pollution
app.use(hpp());

// Set static folder (for serving frontend if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/materials', materials);
app.use('/api/v1/question-papers', questionPapers);
app.use('/api/v1/ai-predictor', aiPredictor);
app.use('/api/v1/flashcards', flashCards);

// Custom error handler
app.use(errorHandler);

module.exports = app;