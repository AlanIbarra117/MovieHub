const reviewService = require('../services/reviewService');
const movieService = require('../services/movieService');

// Display reviews for a movie
function showReviews(req, res) {
    const movieId = Number(req.params.id);

    const movie = movieService.getAllMovies().find(
        item => item.id === movieId
    );

    if (!movie) {
        return res.status(404).send('Movie not found.');
    }

    const reviews = reviewService.getReviewsByMovie(movieId);

    res.render('reviews', {
    movie,
    reviews,
    currentUserId: req.session.userId
});
}

// Create a review
function createReview(req, res) {
    const movieId = Number(req.params.id);
    const { rating, comment } = req.body;

    const movieExists = movieService.getAllMovies().some(
        movie => movie.id === movieId
    );

    if (!movieExists) {
        return res.status(404).send('Movie not found.');
    }

    if (!rating || Number(rating) < 1 || Number(rating) > 10 ||
        !comment || !comment.trim()) {
        return res.status(400).send('Please provide a rating from 1 to 10 and a comment.');
    }

    reviewService.createReview(
        req.session.userId,
        movieId,
        rating,
        comment.trim()
    );

    res.redirect(`/movies/${movieId}/reviews`);
}

// Update a review
function updateReview(req, res) {
    try {
        const { rating, comment } = req.body;

        if (!rating || Number(rating) < 1 || Number(rating) > 10 ||
            !comment || !comment.trim()) {
            return res.status(400).send('Please provide a valid rating and comment.');
        }

        reviewService.updateReview(
            req.params.reviewId,
            req.session.userId,
            rating,
            comment.trim()
        );

        res.redirect(`/movies/${req.params.movieId}/reviews`);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

// Delete a review
function deleteReview(req, res) {
    try {
        reviewService.deleteReview(
            req.params.reviewId,
            req.session.userId
        );

        res.redirect(`/movies/${req.params.movieId}/reviews`);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    showReviews,
    createReview,
    updateReview,
    deleteReview
};