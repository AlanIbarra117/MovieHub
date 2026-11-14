const session = require('express-session');
const userController = require('./controllers/userController');
const express = require('express');
const path = require('path');
const movieController = require('./controllers/movieController');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'moviehub-secret-key-change-this-later',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));

// EJS configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Homepage route
app.get('/', (req, res) => {
    res.render('home');
});

// Movies route
app.get('/movies', movieController.showMovies);

// About route
app.get('/about', (req, res) => {
    res.render('about');
});

// Registration routes
app.get('/register', userController.showRegister);
app.post('/register', userController.registerUser);

// Login routes
app.get('/login', userController.showLogin);
app.post('/login', userController.loginUser);

// Start server
app.listen(PORT, () => {
    console.log(`MovieHub is running at http://localhost:${PORT}`);
});

