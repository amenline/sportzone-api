const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const fetch_leagues = require("../jobs/competitions/leagues");
// const redis = require("redis");

router.get("/", (req, res) => {
  // news();
  res.send({
    status: "successful",
  });
});

router.get("/tests", async (req, res) => {
  try {
    const result = await fetch_leagues();
    res.send({ competitions: result });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// const leagueNames = {
//   World: [
//     "Africa Cup of Nations",
//     "Euro Championship",
//     "Friendlies",
//     "UEFA Champions League",
//     "UEFA Europa League",
//     "World Cup",
//   ],
//   England: ["FA Cup", "Premier League", "Championship"],
//   Germany: ["Bundesliga 1", "Bundesliga 2"],
//   Italy: ["Serie A"],
//   Spain: ["Primera Division"],
//   USA: ["Major League Soccer"],
// };

module.exports = router;
