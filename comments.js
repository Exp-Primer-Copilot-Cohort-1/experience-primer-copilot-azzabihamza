// create web server
// 1. create web server
// 2. create router
// 3. create router handlers
// 4. start web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: comments.length + 1, content });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
