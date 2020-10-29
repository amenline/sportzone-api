const express = require("express");
const router = express.Router();
const fetch_leagues = require("../jobs/competitions/leagues");
const redis = require("redis");
const { promisify } = require("util");

// redis client
let client = redis.createClient();
client.on("error", function (error) {
  console.error(error);
});
const getAsync = promisify(client.get).bind(client);

// @description     All required competitions
// @route           GET /competitions
router.get("/", async (req, res) => {
  try {
    const leagues = await getAsync("competitions");
    const competitons = JSON.parse(leagues);
    res.send(competitons.all);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get("/active", async (req, res) => {
  try {
    const leagues = await getAsync("competitions");
    const competitons = JSON.parse(leagues);
    res.send(competitons.ongoing);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
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
