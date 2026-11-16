const express = require('express');
const router = express.Router();

const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');

// Watchlist routes (login required)
router.get('/', authMiddleware.requireAuth, watchlistController.showWatchlist);

router.post('/add/:id', authMiddleware.requireAuth, watchlistController.addMovie);

router.post('/remove/:id', authMiddleware.requireAuth, watchlistController.removeMovie);

module.exports = router;