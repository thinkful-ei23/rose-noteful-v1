'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

//handle static files
app.use(express.static('public'));

//mount the router with app.use(...)
//app.use();


app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

