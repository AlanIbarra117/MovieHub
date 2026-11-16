const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Display movie reviews
router.get('/:id/reviews', reviewController.showReviews);

// Create a review
router.post(
    '/:id/reviews',
    authMiddleware.requireAuth,
    reviewController.createReview
);

// Update a review
router.post(
    '/:movieId/reviews/:reviewId/update',
    authMiddleware.requireAuth,
    reviewController.updateReview
);

// Delete a review
router.post(
    '/:movieId/reviews/:reviewId/delete',
    authMiddleware.requireAuth,
    reviewController.deleteReview
);

module.exports = router;