const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Registration routes
router.get('/register', userController.showRegister);
router.post('/register', userController.registerUser);

// Login routes
router.get('/login', userController.showLogin);
router.post('/login', userController.loginUser);

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send('Unable to log out.');
        }

        res.redirect('/');
    });
});

module.exports = router;