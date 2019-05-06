const express = require('express');
const mongoose = require('mongoose');

const router = require('./app');

const app = express();
mongoose.Promise = global.Promise;

app.use('/', router);

const uri = process.env.MONGODB_DOCKER_HOST
  ? `mongodb://${process.env.MONGODB_DOCKER_HOST}:27017/product`
  : 'mongodb://localhost:27017/product';

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.info('Mongo connected');
    app.listen(3002, error => {
      error ? console.error(error) : console.info(`Server listening at port: 3002`);
    });
  })
  .catch(console.error);
