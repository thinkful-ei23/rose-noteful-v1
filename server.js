'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');

//require config module 
const { PORT } = require('./config'); 
const notesRouter = require('./router/notes.router');

//create Express app 
const app = express();  

//log all reqs
app.use(morgan('dev'));

console.log('Hello Noteful!');

//create static webserver to handle static files
app.use(express.static('public'));


//parse request body   (translate request body into json object)
//express.json middleware parses incoming reqs that contain json and makes available on req body
app.use(express.json()); 


//talk about this next mentor session 
//mount router on "/api" ( '/api' is not a directory, is an endpoint?)
app.use('/api', notesRouter);


//code from curriculum: Express Error-Handling Middleware
//catch-all 404
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;

  // ** solution code **
  //remember to call next
  next(err);

  //don't need this because we set err.status = 404 line 37
  res.status(404).json({ message: 'Not Found'});
});

//add a custom error handler middleware 
//catch-all *** solution code: refactor to prevent stacktrace leak future exercise ***
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

//listen for incoming connections
app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});