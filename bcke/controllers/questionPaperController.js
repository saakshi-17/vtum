const QuestionPaper = require('../models/QuestionPaper');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../config/cloudinary');

// @desc    Get all question papers
// @route   GET /api/v1/question-papers
// @access  Public
exports.getQuestionPapers = async (req, res, next) => {
  try {
    const { course, semester, year, examType } = req.query;
    
    let query = {};
    if (course) query.course = course;
    if (semester) query.semester = semester;
    if (year) query.year = year;
    if (examType) query.examType = examType;

    const questionPapers = await QuestionPaper.find(query)
      .populate('course', 'name code')
      .populate('uploadedBy', 'name')
      .sort({ year: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questionPapers.length,
      data: questionPapers
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single question paper
// @route   GET /api/v1/question-papers/:id
// @access  Public
exports.getQuestionPaper = async (req, res, next) => {
  try {
    const questionPaper = await QuestionPaper.findById(req.params.id)
      .populate('course', 'name code')
      .populate('uploadedBy', 'name');

    if (!questionPaper) {
      return next(new ErrorResponse(`Question paper not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: questionPaper
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add question paper
// @route   POST /api/v1/question-papers
// @access  Private
exports.addQuestionPaper = async (req, res, next) => {
  try {
    req.body.uploadedBy = req.user.id;

    // Upload file to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'vtucircle/question-papers',
      });

      req.body.file = {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format,
        size: result.bytes,
      };
    }

    const questionPaper = await QuestionPaper.create(req.body);

    res.status(201).json({
      success: true,
      data: questionPaper
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update question paper
// @route   PUT /api/v1/question-papers/:id
// @access  Private
exports.updateQuestionPaper = async (req, res, next) => {
  try {
    let questionPaper = await QuestionPaper.findById(req.params.id);

    if (!questionPaper) {
      return next(new ErrorResponse(`Question paper not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is owner or admin
    if (questionPaper.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this question paper`, 401));
    }

    questionPaper = await QuestionPaper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: questionPaper
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete question paper
// @route   DELETE /api/v1/question-papers/:id
// @access  Private
exports.deleteQuestionPaper = async (req, res, next) => {
  try {
    const questionPaper = await QuestionPaper.findById(req.params.id);

    if (!questionPaper) {
      return next(new ErrorResponse(`Question paper not found with id of ${req.params.id}`, 404));
    }

    // Make sure user is owner or admin
    if (questionPaper.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this question paper`, 401));
    }

    // Delete file from Cloudinary if exists
    if (questionPaper.file && questionPaper.file.public_id) {
      await cloudinary.uploader.destroy(questionPaper.file.public_id);
    }

    await questionPaper.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};