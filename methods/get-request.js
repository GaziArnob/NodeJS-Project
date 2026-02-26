module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let parts = req.url.split('/')[3];  

    if (req.url === '/api/movies') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.movies));
        res.end();

    } else if (baseUrl === "/api/movies/") {  // ✅ fixed slash

        let filterMovies = req.movies.filter((movie) => {
            return movie.id === Number(parts);  // ✅ fixed id + Number()
        });

        if (filterMovies.length > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(filterMovies));
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                title: "Not Found",
                message: "No movie found with given ID"
            }));
        }
        res.end();

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            title: "Not Found",
            message: "Route not found"
        }));
    }
};