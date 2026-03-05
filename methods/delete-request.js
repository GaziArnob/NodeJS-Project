const WriteTofile = require("../util/write-to-file"); // ensure correct import

module.exports = (req, res) => {
    const baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    const parts = req.url.split('/')[3];  
    const movieId = Number(parts); // convert string to number

    // If no ID is provided, return all movies (GET logic can stay separate)
    if (!movieId) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            title: "Bad Request",
            message: "Please provide a valid movie ID"
        }));
        return;
    }

    // Find index of the movie
    const index = req.movies.findIndex(movie => movie.id === movieId);

    if (index === -1) { // movie not found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            title: "Not Found",
            message: `No movie found with ID ${movieId}`
        }));
        return;
    }

    // Remove the movie
    const deletedMovie = req.movies.splice(index, 1)[0]; // remove from array
    WriteTofile(req.movies); // save updated array

    // Respond with deleted movie
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        title: "Deleted",
        message: `Movie with ID ${movieId} has been deleted`,
        movie: deletedMovie
    }));
};