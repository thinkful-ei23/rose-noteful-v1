'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');
const data = require('./db/notes');
const app = express();
app.use(morgan('dev'));

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
//handle static files
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  const query = req.query; 
  let list = data;
  
  if(query.searchTerm) {
    list = list.filter(note => note.title.includes(query.searchTerm)); 
  }
  res.json(list);
  
});

app.get('/api/notes/:id', (req, res) => {
  let id = req.params.id; 
  let note = data.find(note => note.id === parseInt(id));
  res.json(note);
});

app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});