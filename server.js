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

  // //don't need this because we set err.status = 404 line 37
  // res.status(404).json({ message: 'Not Found'});
});

//add a custom error handler middleware 
//catch-all *** solution code: refactor to prevent stacktrace leak future exercise ***
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});
//explain this  new part in solution 
app.startServer = function(port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function() {
      this.stopServer = require('util').promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};

//listen for incoming connections
//wrap with a condition 
if(require.main === module) {
  app.startServer(PORT).catch(err => {
    if(err.code === 'EADDRINUSE') {
      const stars = '*'.repeat(80);
      console.error(`${stars}\nEADDRINUSE (Error Address In Use). Please stop other web servers using port ${PORT}\n${stars}`);
    }
    console.error(err);
  });
}

module.exports = app; //export for testing