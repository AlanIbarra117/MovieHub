// Genre class
class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

// Movie class
class Movie {
    constructor(id, title, description, releaseYear, rating, poster, genreId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.poster = poster;
        this.genreId = genreId;
    }
}

// Available genres
const genres = [
    new Genre(1, "Science Fiction"),
    new Genre(2, "Action"),
    new Genre(3, "Drama"),
    new Genre(4, "Adventure")
];

// Movie catalog
const movies = [
    new Movie(1, "Interstellar", "A journey through space and time.", 2014, 8.7, "", 1),
    new Movie(2, "Inception", "A thief enters people's dreams.", 2010, 8.8, "", 1),
    new Movie(3, "The Dark Knight", "Batman protects Gotham City.", 2008, 9.0, "", 2),
    new Movie(4, "The Shawshank Redemption", "A story of hope and friendship.", 1994, 9.3, "", 3),
    new Movie(5, "Dune: Part Two", "A young leader faces his destiny.", 2024, 8.5, "", 4)
];

// Generate unique IDs for new movies
let nextMovieId = Math.max(...movies.map(movie => movie.id)) + 1;

// Get all movies
function getAllMovies() {
    return movies;
}

// Search movies by title
function searchMovies(searchTerm) {
    return movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

// Filter movies by genre
function filterMoviesByGenre(genreId) {
    if (!genreId) {
        return movies;
    }

    return movies.filter(movie =>
        movie.genreId === Number(genreId)
    );
}

// Add a new movie
function addMovie(title, description, releaseYear, rating, poster, genreId) {
    const newMovie = new Movie(
        nextMovieId++,
        title,
        description,
        Number(releaseYear),
        Number(rating),
        poster,
        Number(genreId)
    );

    movies.push(newMovie);

    return newMovie;
}

// Update an existing movie
function updateMovie(id, title, description, releaseYear, rating, poster, genreId) {
    const movie = movies.find(item => item.id === Number(id));

    if (!movie) {
        throw new Error('Movie not found.');
    }

    movie.title = title;
    movie.description = description;
    movie.releaseYear = Number(releaseYear);
    movie.rating = Number(rating);
    movie.poster = poster;
    movie.genreId = Number(genreId);

    return movie;
}

// Delete a movie
function deleteMovie(id) {
    const index = movies.findIndex(
        movie => movie.id === Number(id)
    );

    if (index === -1) {
        throw new Error('Movie not found.');
    }

    movies.splice(index, 1);
}

// Get all genres
function getAllGenres() {
    return genres;
}

// Export the service
module.exports = {
    Movie,
    Genre,
    getAllMovies,
    getAllGenres,
    searchMovies,
    filterMoviesByGenre,
    addMovie,
    updateMovie,
    deleteMovie
};