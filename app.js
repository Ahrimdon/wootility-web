// app.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = 8080;
const host = "0.0.0.0";
const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".json": "application/json",
    ".txt": "text/plain",
};

http.createServer((req, res) => {
    // Parse the URL and extract just the pathname, ignoring query parameters
    const parsedUrl = url.parse(req.url);
    let filePath = "." + decodeURIComponent(parsedUrl.pathname);
    if (filePath === "./") filePath = "./index.html";

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end("404 Not Found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        }
    });
}).listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
