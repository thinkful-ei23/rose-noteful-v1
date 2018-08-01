'use strict';

const express = require('express');
const router = express.Router();

//load array of notes from db file
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

//PUT notes by ID
router.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id; 
  //validate input
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if(err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });

});

//update GET /api/notes endpoint with the notes.filter query
router.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query; 

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); //goes to error handler
    }
    res.json(list); //responds with filtered array
  });

});  

router.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.find(id, (err, item) => {
    if (err) {
      return next(err); 
    }
    res.json(item);
  });

});


module.exports = router;

