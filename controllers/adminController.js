const movieService = require('../services/movieService');

// Display the Admin dashboard
function showDashboard(req, res) {
    const movies = movieService.getAllMovies();

    res.render('admin/dashboard', {
        movies
    });
}
// Display the Add Movie page
function showAddMovie(req, res) {
    const genres = movieService.getAllGenres();

    res.render('admin/add-movie', {
        genres,
        error: null
    });
}

// Create a new movie
function createMovie(req, res) {
    try {
        const { title, description, releaseYear, rating, poster, genreId } = req.body;

        if (!title || !description || !releaseYear || !rating || !genreId) {
            return res.status(400).send('Please complete all required fields.');
        }

        movieService.addMovie(
            title,
            description,
            releaseYear,
            rating,
            poster || '',
            genreId
        );

        res.redirect('/admin');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Display the Edit Movie page
function showEditMovie(req, res) {
    const movieId = Number(req.params.id);

    const movie = movieService.getAllMovies().find(item => item.id === movieId);

    if (!movie) {
        return res.status(404).send('Movie not found.');
    }

    const genres = movieService.getAllGenres();

    res.render('admin/edit-movie', {
        movie,
        genres,
        error: null
    });
}

// Update an existing movie
function updateMovie(req, res) {
    try {
        const movieId = Number(req.params.id);

        const {
            title,
            description,
            releaseYear,
            rating,
            poster,
            genreId
        } = req.body;

        if (!title || !description || !releaseYear || !rating || !genreId) {
            return res.status(400).send('Please complete all required fields.');
        }

        movieService.updateMovie(
            movieId,
            title,
            description,
            releaseYear,
            rating,
            poster || '',
            genreId
        );

        res.redirect('/admin');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Delete a movie
function deleteMovie(req, res) {
    try {
        const movieId = Number(req.params.id);

        movieService.deleteMovie(movieId);

        res.redirect('/admin');

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    showDashboard,
    showAddMovie,
    createMovie,
    showEditMovie,
    updateMovie,
    deleteMovie
};