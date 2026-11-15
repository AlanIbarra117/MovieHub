// Review class
class Review {
    constructor(id, userId, movieId, rating, comment) {
        this.id = id;
        this.userId = userId;
        this.movieId = movieId;
        this.rating = rating;
        this.comment = comment;
        this.date = new Date();
    }
}

// In-memory review collection
const reviews = [];

let nextReviewId = 1;

// Create a review
function createReview(userId, movieId, rating, comment) {
    const review = new Review(
        nextReviewId++,
        userId,
        movieId,
        Number(rating),
        comment
    );

    reviews.push(review);

    return review;
}

// Get reviews for a movie
function getReviewsByMovie(movieId) {
    return reviews.filter(
        review => review.movieId === Number(movieId)
    );
}

// Update a review
function updateReview(reviewId, userId, rating, comment) {
    const review = reviews.find(
        item => item.id === Number(reviewId) &&
                item.userId === Number(userId)
    );

    if (!review) {
        throw new Error('Review not found.');
    }

    review.rating = Number(rating);
    review.comment = comment;

    return review;
}

// Delete a review
function deleteReview(reviewId, userId) {
    const index = reviews.findIndex(
        item => item.id === Number(reviewId) &&
                item.userId === Number(userId)
    );

    if (index === -1) {
        throw new Error('Review not found.');
    }

    reviews.splice(index, 1);
}

module.exports = {
    Review,
    createReview,
    getReviewsByMovie,
    updateReview,
    deleteReview
};