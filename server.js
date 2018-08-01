'use strict';

// Load array of notes
const express = require('express');
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

//create Express app 
const app = express();

//require config module 
const { PORT } = require('./config');
const { logger } = require('./middleware/logger');

//log all reqs
app.use(logger);

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

//create static webserver to handle static files
app.use(express.static('public'));


//parse request body 
//express.json middleware parses incoming reqs that contain json and makes available on req body
app.use(express.json()); 

//PUT notes by ID
app.put('/api/notes/:id', (req, res, next) => {
  console.log('app.put ran');
  const id = req.params.id; 
  console.log(id);
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
app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query; 

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); //goes to error handler
    }
    res.json(list); //responds with filtered array
  });

});  

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.find(id, (err, item) => {
    if (err) {
      return next(err); 
    }
    res.json(item);
  });
  //code from yesterday
  // let id = req.params.id; 
  // let note = data.find(note => note.id === parseInt(id));
  // res.json(note);
});

//test custom error handler line 97 
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

//code from today's curriculum: Express Error-Handling Middleware
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found'});
});
//add a custom error handler middleware
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});