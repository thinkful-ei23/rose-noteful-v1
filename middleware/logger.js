'use strict';
//task: create an express middleware function which logs current date, req method, req url

//don't need this file bcuz using morgan logger? solution code uses both?

function logger (req, res, next) {
  const now = new Date(); 
  console.log(
    `${now.toLocaleDateString()} ${now.toLocaleDateString()} ${req.method} ${req.url}`);
  next();
}

module.exports = { logger };

//solution code doesn't use destructuring because func declaration line 17? 
/*
  const simpleLogger = function (req, res, next) {
  const now = new Date();
  console.log(`${now.toLocaleString()} ${req.method} ${req.url}`);
  next();
};
module.exports = simpleLogger;

The destructuring assignment syntax lets you unpack 
values from arrays 
or properties from objects 
into distinct variables.
Example:
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
*/

