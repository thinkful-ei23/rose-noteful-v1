'use strict';
//why does the solution code only have "exports.PORT = 8080"?
//because module represents the global object 
//not compatible with all runtimes
// exports.PORT = 8080;

//this code is more complete 
// module.exports.PORT = 8080;
//object destructuring example
// module.exports = { PORT: 8080 };

exports.PORT = process.env.PORT || 8080;