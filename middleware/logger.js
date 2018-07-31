'use strict';
//create an express middleware function which logs current date, req method, req url

function logger (req, res, next) {
  console.log(new Date(), req.method, req.url);
  next();
}

module.exports = { logger };

