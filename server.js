const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const news = require("./jobs/news/index");

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

// test kits
app.use("/dev", require("./api/dev"));
// app.get("/dev", (req, res) => {
//   // news();
//   // res.send({
//   //   status: "successful",
//   // });
// });

// app.get("/tests", async (req, res) => {
//   try {
//     const headers = {
//       "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
//       "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
//     };
//     const response = await fetch(
//       "https://api-football-v1.p.rapidapi.com/v2/leagues",
//       {
//         method: "GET",
//         headers,
//       }
//     );
//     users = await response.json();
//     res.send(users);
//   } catch (error) {
//     console.log(error);
//     res.status(500);
//   }
// });
//

// API Routes
app.use("/news", require("./api/news"));

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
