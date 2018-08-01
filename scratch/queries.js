'use strict';

//simDB = Simple In-Memory Database

const data = require('../db/notes');
const simDB = require('../db/simDB'); //add simDB to app
const notes = simDB.initialize(data); //add simDB to app 

// GET Notes with search
notes.filter('Lady Gaga', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1003, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

//create new note using .create() method
notes.create({
  'title': 'dogs are better than cats!',
  'content': 'stuuuuuuuuuuuuf about dogs!',
}, (err, item) => {
  if (err) {
    console.log(err);
  } if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

//delete a new note using the .delete() method
notes.delete(1010, (err, item) => {
  if (err) {
    console.log(err);
  } if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

