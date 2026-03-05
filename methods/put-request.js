const WriteTofile = require("../util/write-to-file"); // Make sure this matches your write-to-file utility

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let parts = req.url.split('/')[3];
    const movieId = Number(parts);

    if (baseUrl === "/api/movies/") { // updating a specific movie
        let index = req.movies.findIndex(movie => movie.id === movieId);

        if (index === -1) {
            res.statusCode = 404;
           // res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                title: "Not Found",
                message: `No movie found with ID ${movieId}`
            }));
            return;
        }

        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const updatedData = JSON.parse(body); // parse incoming JSON

                // update only existing fields
                req.movies[index] = { ...req.movies[index], ...updatedData };

                // save updated movies array
                WriteTofile(req.movies);

                res.statusCode = 200;
                //res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    title: "Updated",
                    message: `Movie with ID ${movieId} has been updated`,
                    movie: req.movies[index]
                }));
            } catch (err) {
                res.statusCode = 400;
                //res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    title: "Bad Request",
                    message: "Invalid JSON data"
                }));
            }
        });

    } else {
       // res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            title: "Not Found",
            message: "Route not found"
        }));
    }
};