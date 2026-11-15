// Watchlist class
class Watchlist {
    constructor(id, userId) {
        this.id = id;
        this.userId = userId;
        this.movieIds = [];
    }

    // Add a movie to the watchlist
    addMovie(movieId) {
        if (!this.movieIds.includes(movieId)) {
            this.movieIds.push(movieId);
        }
    }

    // Remove a movie from the watchlist
    removeMovie(movieId) {
        this.movieIds = this.movieIds.filter(id => id !== movieId);
    }
}

// In-memory watchlist collection
const watchlists = [];

let nextWatchlistId = 1;

// Find or create a user's watchlist
function getUserWatchlist(userId) {
    let watchlist = watchlists.find(
        list => list.userId === userId
    );

    if (!watchlist) {
        watchlist = new Watchlist(nextWatchlistId++, userId);
        watchlists.push(watchlist);
    }

    return watchlist;
}

// Add a movie
function addMovieToWatchlist(userId, movieId) {
    const watchlist = getUserWatchlist(userId);
    watchlist.addMovie(Number(movieId));

    return watchlist;
}

// Remove a movie
function removeMovieFromWatchlist(userId, movieId) {
    const watchlist = getUserWatchlist(userId);
    watchlist.removeMovie(Number(movieId));

    return watchlist;
}

module.exports = {
    Watchlist,
    getUserWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist
};