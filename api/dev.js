const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const { rapid_fetch, get_year } = require("../helper");
// const news = require("./jobs/news/index");
// const redis = require("redis");

router.get("/", (req, res) => {
  // news();
  res.send({
    status: "successful",
  });
});

router.get("/tests", async (req, res) => {
  try {
    const leagues = await rapid_fetch(
      "https://api-football-v1.p.rapidapi.com/v2/leagues"
    );
    const result = filterLeagues(leagues.api.leagues);
    res.send({ result: result });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

const filterLeagues = (leagues) => {
  const current = [];
  leagues.forEach((league) => {
    const year = get_year();
    if (
      (league.season == year || league.season == year + 1) &&
      league.country == "World"
    ) {
      current.push(league);
    }
  });
  return current;
};

const leagueNames = {
  World: [
    "Africa Cup of Nations",
    "Euro Championship",
    "Friendlies",
    "UEFA Champions League",
    "UEFA Europa League",
    "World Cup",
  ],
  England: ["FA Cup", "Premier League", "Championship"],
  Germany: ["Bundesliga 1", "Bundesliga 2"],
  Italy: ["Serie A"],
  Spain: ["Primera Division"],
  USA: ["Major League Soccer"],
};

module.exports = router;

// world
// "Africa Cup of Nations"
// "Euro Championshi"
// "Friendlies"
// "UEFA Champions League"
// "UEFA Europa League"
// "World Cup"

// England
// "FA Cup"
// "Premier League"
// "Championship"

// Germany
// "Bundesliga"

// Italy
// "Serie A"

// Spain
// "Primera Division"

// USA
// "Major League Soccer"
