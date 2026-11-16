const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect all Admin routes
router.use(authMiddleware.requireAuth);
router.use(authMiddleware.requireAdmin);

// Admin dashboard
router.get('/', adminController.showDashboard);

// Add movies
router.get('/movies/add', adminController.showAddMovie);
router.post('/movies/add', adminController.createMovie);

// Edit movies
router.get('/movies/:id/edit', adminController.showEditMovie);
router.post('/movies/:id/edit', adminController.updateMovie);

// Delete movies
router.post('/movies/:id/delete', adminController.deleteMovie);

module.exports = router;