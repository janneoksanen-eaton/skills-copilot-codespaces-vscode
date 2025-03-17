// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const comments = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  if (pathname === '/comment') {
    const comment = parsedUrl.query.comment;
    comments.push(comment);
    fs.readFile(path.join(__dirname, 'comment.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Comments</h1>
        <ul>
          ${comments.map(comment => `<li>${comment}</li>`).join('')}
        </ul>
        <form action="/comment" method="get">
          <input type="text" name="comment" />
          <input type="submit" value="Submit" />
        </form>
      `);
    });
  } else {
    fs.readFile(path.join(__dirname, 'comment.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Comments</h1>
        <ul>
          ${comments.map(comment => `<li>${comment}</li>`).join('')}
        </ul>
        <form action="/comment" method="get">
          <input type="text" name="comment" />
          <input type="submit" value="Submit" />
        </form>
      `);
    });
  }
});

server.listen(8080, () => {
  console.log('Server is listening on http://localhost:8080');
});

// Create a file named comment.html in the same directory as comments.js
// Add the following html code to comment.html
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Comments</title>
// </head>
// <body>
//   <h1>Comments</h1>
//