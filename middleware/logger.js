'use strict';
//create an express middleware function which logs current date, req method, req url

function logger (req, res, next) {
  const now = new Date(); 
  console.log(
    `${now.toLocaleDateString()} ${now.toLocaleDateString()} ${req.method} ${req.url}`);
  next();
}

module.exports = { logger };

