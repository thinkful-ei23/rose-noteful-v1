'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');

//require config module 
const { PORT } = require('./config');
const { logger } = require('./middleware/logger');
const notesRouter = require('./router/notes.router');

//create Express app 
const app = express();

//log all reqs
app.use(morgan('dev'));

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

//create static webserver to handle static files
app.use(express.static('public'));


//parse request body 
//express.json middleware parses incoming reqs that contain json and makes available on req body
app.use(express.json()); 
app.use('/api', notessRouter);


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