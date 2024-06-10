// Create web server
// Run: node comments.js
// Access: http://localhost:3000/comments

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create web server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Define route
app.get('/comments', function (req, res) {
  fs.readFile('comments.json', function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// Start server
app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});