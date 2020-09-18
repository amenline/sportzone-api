var CronJob = require('cron').CronJob;
var fetch = require('node-fetch');

// const

var home_news = new CronJob(
  '1 * * * * *',
  function () {
    console.log('Will update the home news section frequently');
  },
  null,
  true
);
