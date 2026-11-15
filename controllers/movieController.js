const movieService = require('../services/movieService');

// Display and filter movies
function showMovies(req, res) {
    const searchTerm = req.query.search || '';
    const genreId = req.query.genre || '';

    let movies = movieService.getAllMovies();

    if (searchTerm) {
        movies = movieService.searchMovies(searchTerm);
    }

    if (genreId) {
        movies = movies.filter(movie =>
            movie.genreId === Number(genreId)
        );
    }

    const genres = movieService.getAllGenres();

    res.render('movies', {
        movies,
        genres,
        searchTerm,
        selectedGenre: genreId
    });
}

module.exports = {
    showMovies
};