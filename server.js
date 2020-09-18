const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// config
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// try api fetch
async function getNews(req, res, next) {
  try {
    console.log('Fetching data');
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

// morgan
if (process.env.PORT === 'development') {
  app.use(morgan('dev'));
}

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
