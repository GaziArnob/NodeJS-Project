const e = require('express');
const getReq = require('./methods/get-request');
const postReq = require('./methods/post-request');
const putReq = require('./methods/put-request');
const deleteReq = require('./methods/delete-request');
const http = require('http');
// require('dotenv').config();

let movies = require('./data/movies.json'); // ✅ fixed

const PORT = process.env.PORT || 5003;

const server = http.createServer((req, res) => {
    req.movies = movies;
    switch(req.method) {
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':    
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                title: "Not Found",
                message: "Route not found"
            }));
    }
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});