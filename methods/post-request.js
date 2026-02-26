module.exports = async (req, res) => {
    if (req.url === '/api/movies') {
        try {
            const bodyPromise = requestBodyParser(req);
            console.log("Pending Promise:", bodyPromise);

            const body = await bodyPromise;
            console.log("Resolved body:", body);

            // ✅ Add the new movie to existing movies array
            req.movies.push(body);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(body));

        } catch (err) {
            console.log(err);

            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: "Server Error" }));
        }
    }
};