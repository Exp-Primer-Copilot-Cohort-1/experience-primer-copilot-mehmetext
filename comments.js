const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//parse json data
app.use(bodyParser.json());

//read comments from file
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500);
            res.send('An error occurred while reading the file');
        } else {
            res.send(data);
        }
    });
});

//write comments to file
app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500);
            res.send('An error occurred while reading the file');
        } else {
            const comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    res.status(500);
                    res.send('An error occurred while writing the file');
                } else {
                    res.status(201);
                    res.send('Comment added');
                }
            });
        }
    });
});

//delete comments from file
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500);
            res.send('An error occurred while reading the file');
        } else {
            const comments = JSON.parse(data);
            const filteredComments = comments.filter((comment) => comment.id !== id);
            fs.writeFile('./comments.json', JSON.stringify(filteredComments), (err) => {
                if (err) {
                    res.status(500);
                    res.send('An error occurred while writing the file');
                } else {
                    res.status(200);
                    res.send('Comment deleted');
                }
            });
        }
    });
});

//start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});