const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(config.db,
  {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
  });

app.use(function (_req, res, next) { 
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', require('./routes/file'));

const port = process.env.PORT || 3001;
const server = app.listen(port);

console.log(`GridFS tutorial listening on ${port}`);

module.exports = server;
