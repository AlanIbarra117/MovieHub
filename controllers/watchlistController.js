const watchlistService = require('../services/watchlistService');
const movieService = require('../services/movieService');

// Display the user's watchlist
function showWatchlist(req, res) {
    const userId = req.session.userId;

    const watchlist = watchlistService.getUserWatchlist(userId);
    const allMovies = movieService.getAllMovies();

    const movies = allMovies.filter(movie =>
        watchlist.movieIds.includes(movie.id)
    );

    res.render('watchlist', { movies });
}

// Add a movie to the watchlist
function addMovie(req, res) {
    const userId = req.session.userId;
    const movieId = Number(req.params.id);

    const movieExists = movieService.getAllMovies().some(
        movie => movie.id === movieId
    );

    if (!movieExists) {
        return res.status(404).send('Movie not found.');
    }

    watchlistService.addMovieToWatchlist(userId, movieId);

    res.redirect('/watchlist');
}

// Remove a movie from the watchlist
function removeMovie(req, res) {
    const userId = req.session.userId;
    const movieId = Number(req.params.id);

    watchlistService.removeMovieFromWatchlist(userId, movieId);

    res.redirect('/watchlist');
}

module.exports = {
    showWatchlist,
    addMovie,
    removeMovie
};