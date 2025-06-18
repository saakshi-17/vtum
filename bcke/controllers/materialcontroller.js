const Material = require('../models/Material');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const upload = require('../utils/upload');
const cloudinary = require('../config/cloudinary');

// @desc    Get all materials
// @route   GET /api/v1/materials
// @route   GET /api/v1/courses/:courseId/materials
// @access  Public
exports.getMaterials = async (req, res, next) => {
  try {
    let query;

    if (req.params.courseId) {
      query = Material.find({ course: req.params.courseId });
    } else {
      query = Material.find().populate({
        path: 'course',
        select: 'code name',
      });
    }

    const materials = await query;

    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single material
// @route   GET /api/v1/materials/:id
// @access  Public
exports.getMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id).populate({
      path: 'course',
      select: 'code name',
    });

    if (!material) {
      return next(
        new ErrorResponse(`No material with the id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add material
// @route   POST /api/v1/courses/:courseId/materials
// @access  Private
exports.addMaterial = async (req, res, next) => {
  try {
    req.body.course = req.params.courseId;
    req.body.uploadedBy = req.user.id;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.courseId}`, 404)
      );
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'vtucircle',
    });

    req.body.file = {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
      size: result.bytes,
    };

    const material = await Material.create(req.body);

    res.status(201).json({
      success: true,
      data: material,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update material
// @route   PUT /api/v1/materials/:id
// @access  Private
exports.updateMaterial = async (req, res, next) => {
  try {
    let material = await Material.findById(req.params.id);

    if (!material) {
      return next(
        new ErrorResponse(`No material with the id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is material owner or admin
    if (
      material.uploadedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this material`,
          401
        )
      );
    }

    material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: material,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete material
// @route   DELETE /api/v1/materials/:id
// @access  Private
exports.deleteMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return next(
        new ErrorResponse(`No material with the id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is material owner or admin
    if (
      material.uploadedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this material`,
          401
        )
      );
    }

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(material.file.public_id);

    await material.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Download material
// @route   GET /api/v1/materials/:id/download
// @access  Private
exports.downloadMaterial = async (req, res, next) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return next(
        new ErrorResponse(`No material with the id of ${req.params.id}`, 404)
      );
    }

    // Increment download count
    material.downloads += 1;
    await material.save();

    res.redirect(material.file.url);
  } catch (err) {
    next(err);
  }
};