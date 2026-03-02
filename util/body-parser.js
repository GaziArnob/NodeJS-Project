module.exports = async (request) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            request.on('data', (chunk) => {
                body += chunk.toString();
            });

            request.on('end', () => {
                resolve(JSON.parse(body));  // ✅ use JSON.parse, not json.parse
            });

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};