const userService = require('../services/userService');

// Display registration page
function showRegister(req, res) {
    res.render('register', { error: null });
}

// Register a new user
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render('register', {
                error: 'Please complete all fields.'
            });
        }

        await userService.registerUser(name, email, password);

        res.redirect('/login');

    } catch (error) {
        res.status(400).render('register', {
            error: error.message
        });
    }
}

// Display login page
function showLogin(req, res) {
    res.render('login', { error: null });
}

// Log in an existing user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = userService.findUserByEmail(email || '');

        if (!user || !(await userService.verifyPassword(user, password || ''))) {
            return res.status(401).render('login', {
                error: 'Invalid email or password.'
            });
        }

        req.session.userId = user.id;
        req.session.userRole = user.role;
        req.session.userName = user.name;

        if (user.role === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/movies');
        }

    } catch (error) {
        res.status(500).render('login', {
            error: 'Something went wrong. Please try again.'
        });
    }
}

module.exports = {
    showRegister,
    registerUser,
    showLogin,
    loginUser
};