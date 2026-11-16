const express = require('express');
const router = express.Router();

// Homepage
router.get('/', (req, res) => {
    res.render('home');
});

// About page
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;