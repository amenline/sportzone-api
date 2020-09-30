const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const CronJob = require('cron').CronJob;
const news = require('./jobs/news/index');

// config
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// morgan
if (process.env.PORT === 'development') {
  app.use(morgan('dev'));
}

// create cronjob
const news_worker = new CronJob(
  '* 0/30 * * * *',
  function () {
    news();
  },
  null,
  true
);

// API Routes
app.use('/api/news', require('./api/news'));

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
