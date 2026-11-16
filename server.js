const session = require('express-session');
const userController = require('./controllers/userController');
const express = require('express');
const path = require('path');
const movieController = require('./controllers/movieController');
const watchlistController = require('./controllers/watchlistController');
const authMiddleware = require('./middleware/authMiddleware');
const reviewController = require('./controllers/reviewController');
const adminController = require('./controllers/adminController');
const userService = require('./services/userService');

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

app.get('/admin/movies/:id/edit', authMiddleware.requireAuth, authMiddleware.requireAdmin, adminController.showEditMovie);

app.post('/admin/movies/:id/edit', authMiddleware.requireAuth, authMiddleware.requireAdmin, adminController.updateMovie);

app.post('/admin/movies/:id/delete', authMiddleware.requireAuth, authMiddleware.requireAdmin, adminController.deleteMovie);

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

// Watchlist routes (login required)
app.get('/watchlist', authMiddleware.requireAuth, watchlistController.showWatchlist);
app.post('/watchlist/add/:id', authMiddleware.requireAuth, watchlistController.addMovie);
app.post('/watchlist/remove/:id', authMiddleware.requireAuth, watchlistController.removeMovie);

// Review routes (login required)
app.get('/movies/:id/reviews', reviewController.showReviews);

app.post(
    '/movies/:id/reviews',
    authMiddleware.requireAuth,
    reviewController.createReview
);

app.post(
    '/movies/:movieId/reviews/:reviewId/update',
    authMiddleware.requireAuth,
    reviewController.updateReview
);

app.post(
    '/movies/:movieId/reviews/:reviewId/delete',
    authMiddleware.requireAuth,
    reviewController.deleteReview
);

// Admin routes
app.get('/admin', authMiddleware.requireAuth, authMiddleware.requireAdmin, adminController.showDashboard);

app.get('/admin/movies/add', authMiddleware.requireAuth, authMiddleware.requireAdmin, adminController.showAddMovie);

app.post('/admin/movies/add', authMiddleware.requireAuth, authMiddleware.requireAdmin, adminController.createMovie);

// Start the server and create the Admin account
async function startServer() {
    try {
        await userService.createAdminAccount();

        app.listen(PORT, () => {
            console.log(`MovieHub is running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to start MovieHub:', error.message);
    }
}

startServer();

