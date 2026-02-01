
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/movies") {
    const moviesPath = path.join(__dirname, "movies.json");

    fs.readFile(moviesPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Failed to open movies");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
      res.end(data);
    })

    return;
  }

  if (req.method === "GET" && req.url.startsWith("/images/")) {
    const imagePath = path.join(__dirname, req.url);

    fs.readFile(imagePath, (err, image) => {
      if (err) {
        res.writeHead(404);
        res.end();
        return;
      }

      res.writeHead(200, { "Content-Type": "image/jpeg" })
      res.end(image);
    })

    return;
  }

  res.writeHead(404);
  res.end("Not Found");
})

server.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
})
