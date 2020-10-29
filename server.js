const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const news = require("./jobs/news/index");
const competitions = require("./jobs/competitions/index");

// config
dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT || 3000;

// morgan
if (process.env.PORT === "development") {
  app.use(morgan("dev"));
}

// create cronjob
const news_worker = new CronJob(
  "*/30 * * * *",
  function () {
    news();
  },
  null,
  true
);

// create cronjob
const competiton_worker = new CronJob(
  "0 * * * *",
  function () {
    competitions();
  },
  null,
  true
);

// test kits
app.use("/dev", require("./api/dev"));

// API Routes
app.use("/news", require("./api/news"));

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
