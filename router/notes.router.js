'use strict';

const express = require('express');

const router = express.Router();

//load array of notes from db file
const data = require('./db/notes');


router.get('/api/notes', (req, res) => {
  const query = req.query; 
  let list = data;
  
  if(query.searchTerm) {
    list = list.filter(note => note.title.includes(query.searchTerm)); 
  }
  res.json(list);
  
});

router.get('/api/notes/:id', (req, res) => {
  let id = req.params.id; 
  let note = data.find(note => note.id === parseInt(id));
  res.json(note);
});

module.exports = router;

