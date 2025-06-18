const express = require('express');
const {
  getMaterials,
  getMaterial,
  addMaterial,
  updateMaterial,
  deleteMaterial,
  downloadMaterial,
} = require('../controllers/materialController');
const upload = require('../utils/upload');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getMaterials)
  .post(protect, authorize('student', 'admin'), upload.single('file'), addMaterial);

router
  .route('/:id')
  .get(getMaterial)
  .put(protect, authorize('student', 'admin'), updateMaterial)
  .delete(protect, authorize('student', 'admin'), deleteMaterial);

router.route('/:id/download').get(protect, downloadMaterial);

module.exports = router;