const movieService = require('../services/movieService');

// Display all movies
function showMovies(req, res) {
    const movies = movieService.getAllMovies();
    const genres = movieService.getAllGenres();

    res.render('movies', {
        movies: movies,
        genres: genres
    });
}

module.exports = {
    showMovies
};