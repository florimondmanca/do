/*
Lightweight Express production server.
*/

// Create an Express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Redirect all requests to Angular's index.html file
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

const port = process.env.PORT || 4200;
app.listen(port);
console.log(`Server listening on port ${port}`);
