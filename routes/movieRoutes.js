const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

// Display and search movies
router.get('/', movieController.showMovies);

module.exports = router;