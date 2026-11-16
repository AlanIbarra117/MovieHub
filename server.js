const session = require('express-session');
const express = require('express');
const path = require('path');
const userService = require('./services/userService');

// Route files
const pageRoutes = require('./routes/pageRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');

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

app.use((req, res, next) => {
    res.locals.userRole = req.session.userRole;
    res.locals.userName = req.session.userName;
    next();
});

// EJS configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Application routes
app.use('/', pageRoutes);
app.use('/', userRoutes);
app.use('/movies', movieRoutes);
app.use('/movies', reviewRoutes);
app.use('/watchlist', watchlistRoutes);
app.use('/admin', adminRoutes);

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